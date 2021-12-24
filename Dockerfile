FROM node

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

CMD ["sh", "server.sh"]
