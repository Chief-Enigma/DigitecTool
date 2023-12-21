# Stage 1: Build the React app
FROM node:16 as builder

WORKDIR /app

COPY digitectoolui/package.json client/package-lock.json ./
RUN npm install

COPY digitectoolui ./
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

COPY digitectoolui/src/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]