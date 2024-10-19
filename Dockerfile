FROM nginx:alpine

COPY ./public /usr/share/nginx/html
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx