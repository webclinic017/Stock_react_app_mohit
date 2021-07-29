FROM node:10.23.0

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps
RUN npm install -g sass

COPY . ./
RUN npm run build

RUN npm rebuild node-sass --force

# EXPOSE 3080

# CMD ["npm", "run", "dev"]








# RUN npm install --legacy-peer-deps
