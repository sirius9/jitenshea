#!/bin/bash

set -e
set -u
set -x

envname="jitenshea"
# pyversion=3.5
pyversion=3.6

conda create -n $envname pandas numpy lxml requests psycopg2 sqlalchemy pytest sh luigi python=$pyversion

echo "Activate the environment with:"
echo "> source activate $envname"
