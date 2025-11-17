# Etapa 1: compilación
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

# Copiar variables de entorno si las necesitas (puedes sobreescribirlas con docker-compose)
ENV NODE_ENV=production

EXPOSE 8084
CMD ["node", "dist/config/server.js"]
