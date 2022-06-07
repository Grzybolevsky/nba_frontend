FROM nginx:alpine
COPY ./build /usr/share/nginx/html/p22
COPY ./server /etc/nginx/
EXPOSE 80

CMD ["nginx", "-g", "daemon  off;"]