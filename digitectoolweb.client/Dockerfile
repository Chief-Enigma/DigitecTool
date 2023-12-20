# Stage 1: Build the React app
FROM node:16 as builder

WORKDIR /app

COPY digitectoolweb.client/package.json digitectoolweb.client/package-lock.json ./
RUN npm install

COPY digitectoolweb.client ./
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

COPY digitectoolweb.client/src/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]