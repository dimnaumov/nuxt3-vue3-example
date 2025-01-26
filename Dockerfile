ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /front

# Build
FROM base as build

COPY package*.json /front

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN rm -rf node_modules
RUN rm -rf .output

# Очистка кеша npm
RUN npm cache clean --force

# RUN npm install
RUN npm install --production=false
# RUN npm install --omit=dev --no-optional

COPY . /front

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /front/.output /front/.output

CMD [ "node", ".output/server/index.mjs" ]
