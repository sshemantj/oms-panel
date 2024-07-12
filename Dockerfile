# Stage 1: Deps
# Use the official Node.js 14 Alpine image as the base image for the dependencies stage
FROM node:14-alpine AS deps

# Install libc6-compat, a compatibility layer needed for some Node.js modules
RUN apk add --no-cache libc6-compat

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install only the production dependencies
RUN npm install --production

# Stage 2: Builder
# Use the official Node.js 14 Alpine image as the base image for the build stage
FROM node:14-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the node_modules directory from the deps stage to the working directory
COPY --from=deps /app/node_modules ./node_modules

# Copy all files from the current context to the working directory
COPY . .

# Disable Next.js telemetry during the build process
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build

# Stage 3: Runner
# Use the official Node.js 14 Alpine image as the base image for the runtime stage
FROM node:14-alpine AS runner

# Set the working directory to /app
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a system group nodejs with a specific GID (1001)
RUN addgroup --system --gid 1001 nodejs

# Create a system user nextjs with a specific UID (1001) and add it to the nodejs group
RUN adduser --system --uid 1001 nextjs

# Copy the .next directory from the builder stage to the working directory and set ownership to nextjs:nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy the node_modules directory from the builder stage to the working directory
COPY --from=builder /app/node_modules ./node_modules

# Copy the package.json file from the builder stage to the working directory
COPY --from=builder /app/package.json ./package.json

# Switch to the nextjs user for security
USER nextjs

# Expose port 3000 for the application
EXPOSE 3000

# Set the default port for the application
ENV PORT 3000

# Start the application using npm start
CMD ["npm", "start"]
