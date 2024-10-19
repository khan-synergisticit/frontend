FROM nginx:alpine

COPY ./public /usr/share/nginx/htmls
COPY nginx.conf /etc/nginx/nginx.conf