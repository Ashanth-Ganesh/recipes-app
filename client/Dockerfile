FROM node:24.2-bookworm-slim

WORKDIR /app

# Copying package files and install dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Starting the React app
CMD ["npm", "start"]
