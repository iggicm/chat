# syntax=docker/dockerfile:1

# Stage 1: Build the Angular application
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package.json package-lock.json ./

# Install all dependencies including devDependencies for build
RUN npm ci

# Copy application source code
COPY . .

# Typecheck and build production application
RUN npm run typecheck && npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage (Angular 22 outputs to dist/chat/browser)
COPY --from=builder /app/dist/chat/browser /usr/share/nginx/html

# Copy custom Nginx configuration for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
