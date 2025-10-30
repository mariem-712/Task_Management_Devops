# ===============================
# Stage 1: Install and build
# ===============================
FROM node:20 AS build

WORKDIR /app

# Copy dependency files for caching
COPY package*.json ./

RUN npm ci

COPY . .

# ===============================
# Stage 2: Run the React dev server
# ===============================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only what's needed from build stage
COPY --from=build /app ./


CMD ["npm", "start"]
