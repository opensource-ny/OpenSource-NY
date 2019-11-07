FROM node:13.0.1-alpine
WORKDIR /client

COPY package*.json ./

RUN npm install
COPY . .

CMD npm start