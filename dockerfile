# Stage 1: Build the SvelteKit app
FROM node:20 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with a Node server
FROM node:20 as production-stage

WORKDIR /app

# Copy built app from the previous stage
COPY --from=build-stage /app/build ./build
COPY --from=build-stage /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "build"]
