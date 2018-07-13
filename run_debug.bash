#!/bin/bash
FLASK_DEBUG=true \
FLASK_APP=inventory.py \
/usr/bin/flask run --host=0.0.0.0
