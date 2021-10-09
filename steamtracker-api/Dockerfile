FROM node:14.17.4
WORKDIR /steamtracker-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
