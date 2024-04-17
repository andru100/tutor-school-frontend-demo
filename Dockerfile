# Use the official lightweight Node.js 21.1 image
FROM node:21.1 AS build

# Set environment variables
ARG VITE_APP_BACKEND_ADDRESS
ARG VITE_APP_GOOGLE_CLIENT_ID

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn run build

# Use the official Nginx image as the base image for serving the application
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]