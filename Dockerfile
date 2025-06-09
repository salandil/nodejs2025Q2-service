FROM node:22-alpine

WORKDIR /lib-app

COPY package*.json ./

COPY . .

CMD ["npm", "run", "docker:load"]


