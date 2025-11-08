#!/bin/bash

# Docker Quick Start Script
# This script helps you start the application using Docker

echo "=== Auth Dashboard - Docker Setup ==="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running."
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "Starting application with Docker Compose..."
echo ""

# Start containers
docker-compose up --build

# Note: Press Ctrl+C to stop the containers
