# Use official Nginx image as the base
FROM nginx:alpine

# Copy frontend build files to Nginx's serving directory
COPY . /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default HTTP port)
EXPOSE 9090

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
