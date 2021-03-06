FROM node:lts-alpine

WORKDIR /app

COPY package.json /app/

RUN npm i

COPY . /app

EXPOSE 3030 3031

CMD [ "npm", "start" ]