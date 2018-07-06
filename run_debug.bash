#!/bin/bash
FLASK_DEBUG=true \
FLASK_APP=inventory.py \
flask run --host=0.0.0.0
