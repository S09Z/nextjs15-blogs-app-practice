# Mobilix Frontend Makefile

# Load environment variables from .env file
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

.PHONY: help dev dev-env dev-qa dev-uat dev-prod kill-port source-env

# Default target
help:
	@echo "Available commands:"
	@echo "  make dev        - Start development server with default .env"
	@echo "  make kill-port  - Kill process running on APP_PORT"
	@echo "  make source-env - Source .env file and export variables"

# Development commands
dev: kill-port source-env
	@echo "Starting development server on port $(APP_PORT)..."
	@pnpm run dev

# Kill port command  
kill-port:
	@echo "Killing process on port $(APP_PORT)..."
	@lsof -ti:$(APP_PORT) | xargs kill -9 || echo "No process found on port $(APP_PORT)"

# Source environment file
source-env:
	@echo "Sourcing .env file..."
	@set -a && . ./.env && set +a
	@echo "Environment variables loaded from .env"