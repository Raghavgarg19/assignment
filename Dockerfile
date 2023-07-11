# Use an official Node.js runtime as a base image
FROM node:16-alpine
# Copy package.json and package-lock.json to /app
WORKDIR /app
# Copy the all of the application code to /app
COPY . /app
# Install dependencies
RUN npm install
# Build the application
RUN npm run build
# Expose port 3000 for the application to listen on
EXPOSE 9999
ENV PORT 9999
# Start the application
CMD npm run dev