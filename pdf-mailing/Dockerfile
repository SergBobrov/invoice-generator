FROM node:12

WORKDIR /src

COPY package*.json .babelrc ./
COPY pdf-mailing pdf-mailing
COPY common common

RUN npm install

CMD [ "npm", "run", "pdfsend" ]
