FROM node:lts-alpine

WORKDIR /server

COPY /functions .

RUN npm cache clean --force && npm install

EXPOSE 9000

CMD [ "npm start" ]
