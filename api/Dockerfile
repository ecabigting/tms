# get the node image with the alphine
FROM node:20.16-alpine3.19

# Set the working directory for the api
WORKDIR /api

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application
CMD [ "npm", "run", "start:dev" ]