FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

RUN npm install pm2 -g

# USER node

CMD ["npm", "run", "pm2-runtime", "--prefix", "server"]

EXPOSE 8080