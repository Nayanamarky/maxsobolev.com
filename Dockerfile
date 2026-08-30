# Сборка статического сайта (Astro) и раздача через nginx.
# Используется для деплоя на Amvera Cloud (git push -> автосборка).

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
