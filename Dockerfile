FROM nginx

ADD ./docker/default.conf /etc/nginx/conf.d/default.conf
ADD ./docker/init /init

WORKDIR /usr/share/nginx/html

ADD ./dist/index.html .
ADD ./dist/main.js .

CMD /init
