FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# FORZAR una salida simple y directa
RUN npx ng build --configuration production --output-path=/app/dist-final

FROM nginx:alpine

# COPIAR DIRECTAMENTE sin rutas complejas
COPY --from=build /app/dist-final /usr/share/nginx/html

# CONFIGURACIÓN NGINX MÍNIMA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
