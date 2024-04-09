# Use an official Node.js runtime as the base image
FROM node:21-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./
# Copy .env file into the container
COPY .env ./
# Install the project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 5000

# Define the command to run the application
CMD [ "npm", "start" ]