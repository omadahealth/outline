#!/bin/bash

if [[ -z $1 ]]; then
    echo "Error: You must provide a tag name to the build-image script."
    exit 1
fi
set -ex
docker build . -t "$1"
docker push "$1"
