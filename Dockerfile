FROM alpine

ENV TZ=Europe/Warsaw

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apk update
RUN apk upgrade --no-cache
RUN apk add --no-cache nodejs npm gnupg curl wget unzip vim
RUN npm install -g serve

EXPOSE 3000

COPY . /app/ui/
WORKDIR /app/ui/

RUN npm install
RUN npm run build
ENTRYPOINT ["serve", "-s", "build"]