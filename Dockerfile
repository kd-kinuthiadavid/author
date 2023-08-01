# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the image name
LABEL www.useauthor.image-name="author-img"

# Set the container name
LABEL www.useauthor.container-name="author-container"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install doppler CLI
RUN (curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh || wget -t 3 -qO- https://cli.doppler.com/install.sh) | sh

# Copy the rest of the application source code to the container
COPY . .

# Expose the port on which your NestJS application listens (change to your desired port)
EXPOSE 3000

# Start the NestJS application
CMD ["doppler", "run", "--", "npm", "run", "start"]
