FROM nginx:alpine

COPY ./public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx

CMD ["nginx", "-g", "daemon off;"]