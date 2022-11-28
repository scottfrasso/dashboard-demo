FROM node:16-alpine as build

WORKDIR /app/

COPY package.json ./
COPY yarn.lock ./

COPY apps/api /app/apps/api
COPY libs/dtos /app/libs/dtos

RUN yarn install

RUN yarn workspace @dashboard/api run build

FROM gcr.io/distroless/nodejs:16 as run

COPY --from=build /app /app

WORKDIR /app

USER nonroot

CMD ["apps/api/dist/main.js"]