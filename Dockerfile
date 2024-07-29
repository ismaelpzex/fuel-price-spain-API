# Use a node image from Docker Hub
FROM node:22-alpine

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Install the fastify-cli globally in the container
RUN npm install -g fastify-cli

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the npm dependencies specified in package.json
RUN npm install

# Copy the rest of the code to the container
COPY src ./src

# Set the command to be run when the container starts
CMD [ "npm", "run", "dev" ]
