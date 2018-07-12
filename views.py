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
    if request.method == 'GET':
        return render_template('class_edit.html')
    # return json.dumps(request.form)
    required_fields = ('allow_other_attributes', 'name')
    for field in required_fields:
        if field not in request.form or request.form[field] == '':
            return "Missing required field: " + field
    todo = "insert into db"
    todo = "return success"


@app.route('/attribute')
def attribute():
    attributes = models.attributes()
    if "application/json" in request.accept_mimetypes:
        return json.dumps(attributes)
    return "<p>unimplemented</p>"
