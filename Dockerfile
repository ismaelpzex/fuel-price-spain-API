FROM node:22-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
COPY assets ./assets

EXPOSE 3000

CMD ["npm", "run", "start"]
