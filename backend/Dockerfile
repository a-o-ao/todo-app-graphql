# Stage 1: Build Stage
FROM node:23 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

RUN npx prisma generate

# Stage 2: Production Stage
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy built files and dependencies from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY ./package.json ./

# Install PostgreSQL client for database connection
RUN apk add --no-cache postgresql-client

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Command to run the application
CMD ["node", "dist/main"]
