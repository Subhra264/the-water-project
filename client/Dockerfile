FROM node:16.17.0-alpine AS BUILD_WITH_NODE_GYP
WORKDIR /app

LABEL version="1.0"
LABEL description="Development server for the-water-project react frontend"

ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN yarn

COPY . .

