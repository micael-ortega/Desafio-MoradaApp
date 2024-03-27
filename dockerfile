FROM node:20-alpine AS development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS production

RUN npm ci --only=production

COPY --chown=node:node . .

CMD [ "npm", "start" ]
