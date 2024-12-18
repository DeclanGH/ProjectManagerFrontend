FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy all other files
COPY . .

RUN npm run build

FROM nginx:alpine AS serve

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
