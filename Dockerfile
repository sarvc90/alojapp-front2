FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# CORREGIR ESTAS LÍNEAS - SIN ESPACIOS alrededor del =
ENV NG_CLI_ANALYTICS=false
ENV NODE_OPTIONS="--max_old_space_size=4096"

RUN npx ng build --configuration production --verbose --no-progress

FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
