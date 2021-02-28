FROM node:lts-alpine3.13

WORKDIR /backend

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3030

CMD [ "npm", "run", "dev" ]