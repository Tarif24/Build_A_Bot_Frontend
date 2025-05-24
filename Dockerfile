# 1. Use an official Node image as the base image
FROM node:20-alpine AS builder

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the project files into the container
COPY . .

# 6. Build the Vite app for production
RUN npm run build

# 7. Use a lightweight web server (nginx) for serving the static site
FROM nginx:alpine AS production

# 8. Copy built files from the builder stage to the nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# 9. Expose port 80 to the host
EXPOSE 80

# 10. Start nginx server
CMD ["nginx", "-g", "daemon off;"]