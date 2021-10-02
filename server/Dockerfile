FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
COPY ./ ./
CMD ["npm", "run", "start"]
