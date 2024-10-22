ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /front

# Build
FROM base as build

COPY package*.json /front

# RUN npm install
RUN node --max_old_space_size=2048 $(npm bin)/npm install --omit=dev

COPY . /front

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /front/.output /front/.output

CMD [ "node", ".output/server/index.mjs" ]
