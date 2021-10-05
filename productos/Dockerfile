FROM node:latest

WORKDIR /usr/productos

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
