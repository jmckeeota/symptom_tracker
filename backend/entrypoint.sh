#!/bin/sh

export PGPASSWORD=$PASSWORD

python initial_data.py
python server.py