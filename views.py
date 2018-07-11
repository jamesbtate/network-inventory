from flask import render_template
from inventory import app


@app.route('/hello')
def hello():
    return 'Hello World!'


@app.route('/')
def index():
    return render_template('index.html')
