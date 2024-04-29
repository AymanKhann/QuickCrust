# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application (if using a build process)
# This depends on your application setup; you may not need this if you only want to serve static files
RUN npm run build

# Expose the port for the application
# Change this to the port your frontend application uses
EXPOSE 3000

# Define the entry point to start the application
# This assumes you are using a development server like npm start
CMD ["npm", "start"]
