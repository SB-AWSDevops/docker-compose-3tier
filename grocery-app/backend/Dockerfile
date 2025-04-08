# -------- Stage 1: Build ----------
    FROM node:18-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install --only=production
    
    COPY . .
    
    # -------- Stage 2: Run ----------
    FROM gcr.io/distroless/nodejs18
    
    WORKDIR /app
    
    COPY --from=build /app /app
    
    ENV NODE_ENV=production
    
    CMD ["server.js"]
    