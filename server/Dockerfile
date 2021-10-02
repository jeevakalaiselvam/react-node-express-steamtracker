FROM node:15
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./ ./
ENV PORT 8000
EXPOSE 8000
CMD ["npm", "run", "dev"]
