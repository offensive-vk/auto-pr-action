FROM node:20-slim

SHELL ["/bin/bash", "-c"]

RUN npm i -g pnpm@9.10.0

WORKDIR /app

COPY package*.json ./

RUN pnpm i

COPY . .

RUN pnpm run bundle

ENTRYPOINT ["node", "dist/index.js"]

LABEL \
    "name"="Auto PR Action" \
    "homepage"="https://github.com/marketplace/actions/auto-pr-action" \
    "repository"="https://github.com/offensive-vk/auto-pr-action" \
    "maintainer"="TheHamsterBot <TheHamsterBot@users.noreply.github.com>"