FROM node:12

WORKDIR /src

COPY package*.json .babelrc ./
COPY pdf-generation pdf-generation
COPY common common

RUN npm install

CMD [ "npm", "run", "pdfgen" ]