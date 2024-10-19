FROM nginx:alpine

RUN chown nginx:nginx -R usr/share/nginx
COPY ./public /usr/share/nginx/htmlls
COPY nginx.conf /etc/nginx/nginx.conf