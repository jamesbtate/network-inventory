import instance.config
import mysql.connector
from flask import escape


CONNECTION = None
CURSOR = None


def _cursor():
    global CURSOR
    global CONNECTION
    if not CURSOR or not CONNECTION.is_connected():
        CONNECTION = mysql.connector.connect(user=instance.config.DB_USER,
                                             password=instance.config.DB_PASS,
                                             host=instance.config.DB_HOST,
                                             database=instance.config.DB_DB)
        CURSOR = CONNECTION.cursor(dictionary=True)
    return CURSOR


def _commit():
    CONNECTION.commit()


def query():
    return _cursor().statement


def is_boolean_value(value):
    if value in (True, False, 1, 0):
        return True
    if isinstance(value, str):
        if value.lower() in ('yes', 'no', 'true', 'false'):
            return True
    return False


def is_truthy_value(value):
    if isinstance(value, int):
        if value >= 1:
            return True
    elif isinstance(value, bool):
        return value
    elif isinstance(value, str):
        if value.lower() in ('yes', 'true'):
            return True
    return False


def attribute(id):
    """ Return the data about one attribute. """
    if not isinstance(id, int):
        raise TypeError("Attribute ID must be integer")
    cursor = _cursor()
    query = "SELECT * FROM attribute where id=%s"
    args = (id,)
    cursor.execute(query, args)
    attr = cursor.fetchone()
    query = "SELECT id,value FROM attribute_value WHERE attribute_id=%s"
    args = (id,)
    cursor.execute(query, args)
    rows = cursor.fetchall()
    attr['values'] = []
    for row in rows:
        attr['values'].append({'index': row['id'], 'value': row['value']})
    if rows:
        attr['next_index'] = max([_['id'] for _ in rows]) + 1
    return attr


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
    integer_fields = ('id',)
    good_data = {}
    for field in required_fields:
        if field not in data \
                or (type(data[field]) == str
                    and str(data[field]).strip() == ''):
            return False, "Missing value for field " + field
    for field in yes_no_fields:
        if field in data:
            value = data[field]
            if not is_boolean_value(value):
                return False, "Invalid boolean-like value for field " + field
            else:
                good_data[field] = is_truthy_value(value)
    for field in text_fields:
        if field in data:
            if data[field] is None:
                good_data[field] = None
            else:
                good_data[field] = str(escape(data[field]))
    for field in integer_fields:
        if field in data:
            if not isinstance(data[field], int):
                return False, "Invalid integer value for field " + field
            else:
                good_data[field] = data[field]
    if not is_truthy_value(data['free_form']):
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
    if 'id' in data:  # updating an existing attribute
        query = "UPDATE attribute SET"
        params = []
        for field in fields + optional_fields:
            if field in data:
                query = query + ' ' + field + '=%s,'
                params.append(data[field])
        query = query[:-1]  # drop the extra comma at the extends
        query = query + " WHERE id=%s"
        params.append(data['id'])
    else:  # adding a new attribute
        for field in optional_fields:
            if field in data:
                fields.append(field)
                params.append(data[field])
        query = 'INSERT INTO attribute (' + ','.join(fields) \
                + ') VALUES (' + '%s,' * (len(fields) - 1) + '%s)'
    cursor = _cursor()
    cursor.execute(query, params)
    attribute_id = cursor.lastrowid  # this only works for insert statements
    if 'id' in data:
        attribute_id = data['id']
    if not data['free_form']:
        for value in data['values']:
            # first we check if the attribute_value is already in the DB.
            query = "SELECT value FROM attribute_value WHERE \
                    id=%s AND attribute_id=%s"
            cursor.execute(query, (value['index'], attribute_id))
            row = cursor.fetchone()
            if not row:  # attribute_value is not in the DB
                query = "INSERT INTO attribute_value (attribute_id,value)" \
                        + "VALUES (%s,%s)"
                params = (attribute_id, value['value'])
                cursor.execute(query, params)
            elif row['value'] != value['value']:
                # attribute_value is in the DB and we need to update the value.
                query = "UPDATE attribute_value SET value=%s WHERE id=%s"
                params = (value['value'], value['index'])
                cursor.execute(query, params)
    _commit()


def attribute_update(data):
    """ Update an existing attribute """
