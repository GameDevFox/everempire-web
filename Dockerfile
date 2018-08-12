FROM nginx

WORKDIR /usr/share/nginx/html

ADD ./dist/index.html .
ADD ./dist/main.js .
