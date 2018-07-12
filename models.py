import instance.config
import mysql.connector

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
        CURSOR = CONNECTION.cursor()
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
