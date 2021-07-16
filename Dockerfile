FROM node:16-alpine3.11

WORKDIR /core

ENV PATH ="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

CMD ["npm","start"]