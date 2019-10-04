#!/bin/bash

if [[ -z $1 ]]; then
    echo "Error: You must provide a deploy environment. (e.g. staging)"
    echo
    echo "Usage: $0 {staging}"
    exit 1
fi

DEPLOY_ENV=$1

case "$DEPLOY_ENV" in
    "staging")
        PROMETHEUS_ENV="staging"
        GIT_TAG_PREFIX="staging"
    ;;
esac

set -ex
export DOCKER_IMAGE=$(./jenkins/image_name.sh staging)

# See if image already exists in ECR
IMAGE_EXISTS=$(aws ecr describe-images --repository-name="omada-registry/engineering/outline" --image-ids=imageTag="$DOCKER_IMAGE" 2> /dev/null)

# If it does not exist, build it
if [ -z "${IMAGE_EXISTS}" ]; then
  ./jenkins/build-image.sh "$DOCKER_IMAGE"
fi

# Deploy that image to nomad
levant deploy -force-count -ignore-no-changes <(nomad-render-job nomad/migrate.j2 nomad/config/${DEPLOY_ENV}.yml)
levant deploy -force-count -ignore-no-changes <(nomad-render-job nomad/deploy.j2 nomad/config/${DEPLOY_ENV}.yml)
git tag ${GIT_TAG_PREFIX}_`date +"%Y%m%d%H%M%S"`
git push --tags
