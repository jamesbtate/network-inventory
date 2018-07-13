from flask import render_template, request
from inventory import app
import models
import json


@app.route('/hello')
def hello():
    return 'Hello World!'


@app.route('/')
def index():
    return render_template('index.html')


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
    attributes = models.attributes()
    if "application/json" in request.accept_mimetypes:
        return json.dumps(attributes)
    return "<p>unimplemented</p>"

@app.route('/attribute/edit', methods=('GET', 'POST'))
def attribute_edit():
    kwargs = {'title': 'Edit Attribute'}
    kwargs['startup_function'] = 'attributeEditPage'
    if request.method == 'GET':
        return render_template('blank.html', **kwargs)
    return "to-do"
