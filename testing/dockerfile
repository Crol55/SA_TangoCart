FROM germansalguero711/node-chrome:latest 

WORKDIR /usr/src/testing

COPY package.json package-lock.json ./ 

RUN npm ci 

COPY . . 

ENV CHROME_BIN=/usr/bin/google-chrome 

ENTRYPOINT npm run test:ci