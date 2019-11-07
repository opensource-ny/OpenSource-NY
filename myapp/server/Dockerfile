FROM node:13.0.1-alpine
WORKDIR /server

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5000
CMD npm run start