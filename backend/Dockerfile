FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN rm -rf node_modules && npm ci --production
EXPOSE 5000
CMD ["npm", "start"]
