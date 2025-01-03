# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf node_modules # Remove node_modules after building to save space

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build . 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
