# Use an official Node runtime as a parent image
FROM node:18-alpine

# Install bash
RUN apk update && apk add --no-cache bash

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT=3000

# Run the app when the container launches
CMD ["node", "src/service.js"]
