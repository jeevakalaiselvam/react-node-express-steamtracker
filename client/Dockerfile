FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production
ENV REACT_APP_API_ENDPOINT=http://localhost:8000/api/
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]
