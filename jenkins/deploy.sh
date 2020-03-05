#!/bin/bash

if [[ -z $1 ]]; then
    echo "Error: You must provide a deploy environment. (e.g. staging)"
    echo
    echo "Usage: $0 {infra}"
    exit 1
fi

DEPLOY_ENV=$1

case "$DEPLOY_ENV" in
    "infra")
        PROMETHEUS_ENV="infra"
        GIT_TAG_PREFIX="infra"
    ;;
esac

set -ex

ECR_REPO="661956145551.dkr.ecr.us-west-2.amazonaws.com/omada-registry/engineering/outline"
IMAGE_NAME=$(./jenkins/image_name.sh infra)
export DOCKER_IMAGE="$ECR_REPO:$IMAGE_NAME"

# See if image already exists in ECR (dont error out when this fails)
set +e
IMAGE_EXISTS=$(aws ecr describe-images --repository-name "omada-registry/engineering/outline" --image-ids imageTag="$IMAGE_NAME" 2> /dev/null)
set -e

# If it does not exist, build it
if [ -z "${IMAGE_EXISTS}" ]; then
  ./jenkins/build-image.sh "$DOCKER_IMAGE"
fi

# Deploy that image to nomad
levant deploy -force-count -ignore-no-changes <(nomad-render-job nomad/migrate.j2 nomad/config/${DEPLOY_ENV}.yml)
levant deploy -force-count -ignore-no-changes <(nomad-render-job nomad/deploy.j2 nomad/config/${DEPLOY_ENV}.yml)
git tag ${GIT_TAG_PREFIX}_`date +"%Y%m%d%H%M%S"`
git push --tags
