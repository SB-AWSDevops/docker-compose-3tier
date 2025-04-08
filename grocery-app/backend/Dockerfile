# ---------- Stage 1: Build ----------
# Use official Node.js image as base
FROM node:18 as base

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install && npm install dotenv

# Copy .env separately (before everything else)
COPY .env .env  

# Copy the rest of the backend files
COPY . .

# ---------- Stage 2: Production ----------
FROM gcr.io/distroless/nodejs18

WORKDIR /app

COPY --from=base /app /app


# Start the backend server
CMD ["node", "server.js"]

