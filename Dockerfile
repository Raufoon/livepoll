FROM node:lts-alpine

RUN apk update && apk add bash

COPY /backend /server
WORKDIR /server
RUN npm cache clean --force && npm install

COPY /livepoll-pwa/build /pwa

WORKDIR /
ADD start.sh /
RUN chmod +x /start.sh

EXPOSE 8080 9000

CMD ["/start.sh"]
