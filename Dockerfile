FROM node:22

WORKDIR /app

# Copy package files
COPY api/package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY api/ ./

# Build TypeScript
RUN npm run build

# Remove devDependencies
RUN npm prune --production

EXPOSE 443

CMD ["npm", "start"]