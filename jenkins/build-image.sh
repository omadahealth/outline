#!/bin/bash

IMAGE_NAME=$(./jenkins/image_name.sh "$1")
set -ex
docker build . -t "$IMAGE_NAME"
docker push "$IMAGE_NAME"
