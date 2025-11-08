FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3003

# Run seed script and start server
CMD ["sh", "-c", "npm run seed && npm start"]
