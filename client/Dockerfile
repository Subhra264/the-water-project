FROM node:16.17.0-alpine AS BUILD_WITH_NODE
WORKDIR /app

LABEL version="1.0"
LABEL description="Development server for the-water-project react frontend"

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

FROM nginx:latest
WORKDIR /src

COPY --from=BUILD_WITH_NODE /app/build /usr/share/nginx/html
COPY --from=BUILD_WITH_NODE /app/config/nginx/config.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
