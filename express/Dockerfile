FROM node:12

WORKDIR /src

COPY package*.json .babelrc ./
COPY express express
COPY common common

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "server" ]