FROM  node:12-alpine AS base
WORKDIR /app
COPY ./app/package*.json ./

FROM base as build
COPY ./app .
RUN npm install && npm run build

FROM base as release
RUN npm install --production
COPY --from=build /app/dist /app/dist
COPY --from=build /app/.env /app/.env
EXPOSE 3000
CMD npm start