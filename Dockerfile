FROM node:12-alpine

# Add Tini,
# Need this for properly handling SIGINT: https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
# Cant do it with nomad yet: https://github.com/hashicorp/nomad/issues/2719
ENV TINI_VERSION v0.18.0
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

ENV PATH /opt/outline/node_modules/.bin:/opt/node_modules/.bin:$PATH
ENV NODE_PATH /opt/outline/node_modules:/opt/node_modules
ENV APP_PATH /opt/outline
RUN mkdir -p $APP_PATH

WORKDIR $APP_PATH
COPY . $APP_PATH

RUN yarn install --pure-lockfile
RUN cp -r /opt/outline/node_modules /opt/node_modules

CMD yarn build && yarn start

EXPOSE 3000
