# 1. Use official Node.js image for building
FROM node:20-alpine AS builder

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy all other project files
COPY . .

# 5. Build the app for production
ARG VITE_RAG_CHAT_API_URL
ENV VITE_RAG_CHAT_API_URL=$VITE_RAG_CHAT_API_URL
RUN npm run build

# 6. Use a minimal Node.js image to serve the built files
FROM node:20-alpine AS production

# 7. Install 'serve' to serve static files
RUN npm install -g serve

# 8. Set working directory and copy built files
WORKDIR /app
COPY --from=builder /app/dist .

# 9. Expose port 3000 (or whatever you prefer)
EXPOSE 3000

# 10. Command to run the static server
CMD ["serve", "-s", ".", "-l", "3000"]
