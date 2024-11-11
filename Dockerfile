FROM node:20-slim AS base

WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS development

RUN npm install

COPY . .

RUN npm run build

FROM base AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=production

COPY --from=development /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
