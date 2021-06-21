FROM node:14

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 5001

RUN npm run build