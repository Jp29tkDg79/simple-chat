FROM node:alpine

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV TZ=Asia/Tokyo

WORKDIR /app

COPY . .

RUN npm install && npm run build


CMD ["npm", "start"]