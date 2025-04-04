# Use official Node.js image as base
FROM node:18

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


# Start the backend server
CMD ["node", "server.js"]

