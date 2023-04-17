FROM node:16-alpine AS development

WORKDIR .

COPY package*.json ./

RUN apk add --no-cache python3 g++ make

RUN yarn global add rimraf

RUN yarn install --only=development

COPY . .

RUN yarn build:api

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR .

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /dist/apps/api ./dist

CMD ["node", "dist/apps/api/main"]
