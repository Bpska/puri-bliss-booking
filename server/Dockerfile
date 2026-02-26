FROM node:18-alpine

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy all server source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server node index.js
CMD ["node", "index.js"]
