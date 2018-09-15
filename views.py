from flask import render_template, request, jsonify
from inventory import app
import mysql.connector
import models


@app.route('/hello')
def hello():
    return 'Hello World!'


@app.route('/')
@app.route('/class')
@app.route('/device')
@app.route('/<path:path>')  # catch-all route
def index(path):
    if '5' in path and 'edit' not in path:
        return path, 400
    return render_template('index.html')


def request_wants_json():
    best = request.accept_mimetypes \
        .best_match(['application/json', 'text/html'])
    return best == 'application/json' and \
        request.accept_mimetypes[best] > \
        request.accept_mimetypes['text/html']


@app.route('/class/edit', methods=('GET', 'POST'))
def class_edit():
    kwargs = {'title': 'Edit Class'}
    kwargs['startup_function'] = 'classEditPage'
    if request.method == 'GET':
        return render_template('blank.html', **kwargs)
    # return json.dumps(request.form)
    required_fields = ('allow_other_attributes', 'name')
    for field in required_fields:
        if field not in request.form or request.form[field] == '':
            return "Missing required field: " + field
    return "todo: insert into db and return success"


@app.route('/attribute')
def attribute():
    if request_wants_json():
        attributes = models.attributes()
        return jsonify(attributes)
    return index(request.path)


@app.route('/attribute/<int:id>')
def attribute_id(id):
    if request_wants_json():
        try:
            attr = models.attribute(id)
        except Exception as e:
            return str(e), 500
        if attr is None:
            return "No such attribute", 404
        return jsonify(attr)
    return index(request.path)


@app.route('/attribute/edit', methods=('GET', 'POST'))
def attribute_edit():
    kwargs = {}
    kwargs['title'] = 'Edit Attribute'
    kwargs['startup_function'] = 'attributeEditPage'
    if request.method == 'GET':
        return render_template('blank.html')
    # otherwise, we are saving a new or updated attribute_edit
    # return str(request.get_json())
    valid, output = models.attribute_form_process(request.get_json())
    if not valid:
        return output, 400
    try:
        if 'id' in output:
            models.attribute_insert(output)
        else:
            models.attribute_insert(output)
        return "success"
    except mysql.connector.Error as e:
        return str(e) + " " + models.query(), 500
    except Exception as e:
        return str(e), 500
