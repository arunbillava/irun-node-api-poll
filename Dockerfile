FROM node:12-alpine

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm i

EXPOSE 4040

CMD ["npm", "start"]
