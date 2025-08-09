# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build:all

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install serve for static files
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server ./server

# Install production dependencies
RUN npm ci --only=production

# Create start script
RUN echo '#!/bin/sh\nserve -s dist/spa -p 3000 &\nnode server/index.js' > start.sh
RUN chmod +x start.sh

EXPOSE 3000
EXPOSE 5000

CMD ["./start.sh"]
