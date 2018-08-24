import instance.config
import mysql.connector
from flask import escape


CONNECTION = None
CURSOR = None


def _cursor():
    global CURSOR
    global CONNECTION
    if not CURSOR:
        CONNECTION = mysql.connector.connect(user=instance.config.DB_USER,
                                             password=instance.config.DB_PASS,
                                             host=instance.config.DB_HOST,
                                             database=instance.config.DB_DB)
        CURSOR = CONNECTION.cursor(dictionary=True)
    return CURSOR


def _commit():
    CONNECTION.commit()


def attributes():
    """ Return list of dicts representing attributes in DB """
    cursor = _cursor()
    query = "SELECT * FROM attribute"
    args = ()
    cursor.execute(query, args)
    rows = cursor.fetchall()
    return rows


def attribute_form_process(data):
    """ Validates form data is a valid attribute update or insert.
        Returns False and helpful error string if invalid form.
        Returns True and DB-safe data if valid."""
    required_fields = ('name', 'multi_value', 'free_form')
    text_fields = ('name', 'description', 'display_name')
    yes_no_fields = ('multi_value', 'free_form')
    good_data = {}
    for field in required_fields:
        if field not in data or data[field].strip() == '':
            return False, "Missing value for field " + field
    for field in yes_no_fields:
        if field in data:
            value = data[field].lower()
            if value not in ('yes', 'no'):
                return False, "Invalid value for field " + field
            else:
                if value == 'yes':
                    good_data[field] = True
                else:
                    good_data[field] = False
    for field in text_fields:
        if field in data:
            good_data[field] = str(escape(data[field]))
    if data['free_form'].lower() == 'no':
        if 'values' not in data or len(data['values']) < 1:
            return False, "Must specifiy values"
        for item in data['values']:
            if 'index' not in item or 'value' not in item:
                return False, "Missing attributes of value"
            index = item['index']
            value = item['value'].strip()
            if not isinstance(index, int) or index < 0:
                return False, "Value index must be an integer"
            if not value:
                return False, "Value cannot be blank"
        good_data['values'] = data['values']
    return True, good_data


def attribute_insert(data):
    """ Insert a new attribute and return the ID """
    fields = ["name", "free_form", "multi_value"]  # initially required fields
    optional_fields = ["display_name", "description"]
    params = [data['name'], data['free_form'], data['multi_value']]
    for field in optional_fields:
        if field in data:
            fields.append(field)
            params.append(data[field])
    query = 'INSERT INTO attribute (' + ','.join(fields) \
            + ') VALUES (' + '%s,' * (len(fields) - 1) + '%s)'
    cursor = _cursor()
    cursor.execute(query, params)
    id = cursor.lastrowid
    if not data['free_form']:
        query = "INSERT INTO attribute_value (attribute_id,value)" \
                + "VALUES (%s,%s)"
        for value in data['values']:
            params = (id, value['value'])
            cursor.execute(query, params)
    _commit()


def attribute_update(data):
    """ Update an existing attribute """
