#!/bin/bash

if [[ -z $1 ]]; then
    echo "Error: You must provide an environment name to the image name script. (e.g. staging)"
    exit 1
fi
ECR_REPO="661956145551.dkr.ecr.us-west-2.amazonaws.com/omada-registry/engineering/outline"
if [ -z "${BRANCH_NAME}" ]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
fi
SHA=$(git rev-parse HEAD)
echo "$ECR_REPO:$1-$BRANCH_NAME-$SHA"
