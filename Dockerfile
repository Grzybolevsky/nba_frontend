FROM node:current-alpine AS builder

WORKDIR /app
RUN apk update && \
    apk upgrade --no-cache

COPY . .

RUN npm ci && \
    npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html/p22
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]