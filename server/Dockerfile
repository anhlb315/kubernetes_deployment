FROM node:alpine

#USER node

WORKDIR /home/node

COPY package*.json ./

COPY . ./

RUN npm install

EXPOSE 9000

CMD ["npm", "start"]
