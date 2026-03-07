# Use official Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest
COPY frontend/ .

# Build
RUN npm run build

# Start
ENV PORT=3000
CMD ["npm", "start"]
