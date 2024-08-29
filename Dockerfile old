# Use latest node image
FROM node

# Set working directory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port for development
EXPOSE 3000 

# Start app in dev mode
CMD ["npm", "start"]