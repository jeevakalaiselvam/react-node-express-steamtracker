# Stage 1
FROM node:14.17.4 as build-stage

WORKDIR /steamtracker-ui
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /steamtracker-ui/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /steamtracker-ui/conf/nginx.conf /etc/nginx/conf.d
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
