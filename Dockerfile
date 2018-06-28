FROM keymetrics/pm2:latest-alpine
RUN adduser -D -g '' app

ARG PORT=3000
ARG NODE_ENV=production
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV

WORKDIR /home/app

COPY ./ ./
COPY package.json yarn.lock ./
COPY pm2.json ./

# ENV NPM_CONFIG_LOGLEVEL warn
RUN apk update && apk upgrade && apk add --no-cache git
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
  yarn install --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
  touch yarn-error.log; \
  mkdir -m 777 build; \
  yarn install --no-cache --frozen-lockfile; \
  chown -R node:node build node_modules package.json yarn.lock yarn-error.log; \
  else \
  touch yarn-error.log; \
  mkdir -p -m 777 build node_modules /home/node/.cache/yarn; \
  chown -R node:node build node_modules package.json yarn.lock yarn-error.log  /home/node/.cache/yarn; \
  fi;

RUN pm2 install pm2-server-monit
EXPOSE $PORT
CMD ["pm2-runtime", "start", "pm2.json"]
