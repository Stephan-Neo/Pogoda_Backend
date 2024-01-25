FROM node:21.1.0
WORKDIR /usr/src/app
COPY package*.json .
RUN yarn install
COPY . /usr/src/app
RUN yarn build