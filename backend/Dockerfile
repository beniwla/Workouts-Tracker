# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose port 4000 inside container
EXPOSE 4000

# Start the server
CMD ["npm", "run", "start"]
