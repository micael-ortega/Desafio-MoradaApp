FROM node:20-alpine AS development

USER node
WORKDIR /home/node

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS builder

USER node

WORKDIR /home/node

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build && npm prune --omit=dev

FROM node:20-alpine AS production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules
COPY --from=builder --chown=node:node /home/node/dist ./dist

COPY ./.env ./

CMD ["node", "dist/main.js"]