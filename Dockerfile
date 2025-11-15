FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# VERIFICAR QUÉ HAY EN DIST
RUN echo "=== CONTENIDO DE DIST ==="
RUN ls -la /app/dist/
RUN echo "=== CONTENIDO DE DIST/ALOJAPP ==="
RUN ls -la /app/dist/alojapp/

FROM nginx:alpine
COPY --from=build /app/dist/alojapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# VERIFICAR QUÉ SE COPIÓ A NGINX
RUN echo "=== CONTENIDO EN NGINX ==="
RUN ls -la /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
