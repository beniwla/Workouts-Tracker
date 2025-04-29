# Use Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose frontend port (usually 3000)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
