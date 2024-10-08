FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json .

RUN apk add --no-cache python3 g++ make

RUN yarn global add rimraf@3

RUN yarn install --ignore-scripts --ignore-engines

COPY . .

RUN yarn build:api

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install --ignore-scripts --ignore-engines

COPY . .

COPY --from=development /usr/src/app/dist/apps/api .

CMD ["node", "main"]
