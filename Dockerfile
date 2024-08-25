# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port that your application will run on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
