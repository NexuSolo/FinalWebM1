FROM node:22.0-slim

WORKDIR /app

COPY package.json /app

RUN npm install

RUN apt-get update -y && apt-get install -y openssl

COPY . /app

CMD ["sh", "-c", "sleep 5 && npm run serve"]