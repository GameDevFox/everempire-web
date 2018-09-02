FROM nginx:alpine

ADD ./docker/default.conf /etc/nginx/conf.d/default.conf
ADD ./docker/init /init

WORKDIR /usr/share/nginx/html

ADD ./dist .

CMD /init
