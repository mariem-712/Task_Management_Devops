# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Start the development server
CMD ["npm", "start"]