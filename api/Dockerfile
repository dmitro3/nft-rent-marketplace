FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the 'config' and 'api' directories from your local host to your image filesystem
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
