FROM node:22-alpine3.20

# Create a non-root user
RUN addgroup -S examplegroup && adduser -S example -G examplegroup

# Switch to the new user
USER example

# Set the working directory
WORKDIR /home/example

# Copy application files to the working directory
COPY --chown=example:example . .

# Install dependencies
RUN npm i --frozen-lockfile
# RUN npm ci --frozen-lockfile

# Use a non-root user to run the application
CMD [ "node", "example.js" ]