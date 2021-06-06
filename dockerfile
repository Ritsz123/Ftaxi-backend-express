FROM node:14.16-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
CMD node app.js
