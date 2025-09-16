# Makefile for medusajs/nextjs-starter-medusa

# Load .env
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
else
    $(info .env file not found, proceeding without it)
endif

# Variables
COMPOSE := docker compose
YARN := yarn
COMPOSE_FILE := docker-compose.yml
NAME ?= medusa
ENV ?= dev

# Default target: full setup
.PHONY: all
all: setup up 
# Install dependencies (local)
.PHONY: setup
setup:
	@echo "Installing dependencies..."
	$(YARN) install

# Start Docker services (Postgres, Redis, Medusa)
.PHONY: up
up:
	@echo "Starting Docker services..."
	$(COMPOSE) -f $(COMPOSE_FILE) -p $(NAME)-$(ENV) up -d

# Stop Docker services
.PHONY: down
down:
	@echo "Stopping Docker services..."
	$(COMPOSE) -f $(COMPOSE_FILE) -p $(NAME)-$(ENV) down

# Start Next.js frontend (local)
.PHONY: dev-frontend
dev-frontend:
	@echo "Starting Next.js frontend..."
	$(YARN) dev

# View logs (container)
.PHONY: logs
logs:
	$(COMPOSE) -f $(COMPOSE_FILE) -p $(NAME)-$(ENV) logs -f medusa

# Clean up
.PHONY: clean
clean:
	@echo "Cleaning up..."
	$(COMPOSE) -f $(COMPOSE_FILE) -p $(NAME)-$(ENV) down -v
	rm -rf node_modules .next

# Help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make setup        - Install dependencies (local)"
	@echo "  make up           - Start Docker services (Postgres, Redis, Medusa)"
	@echo "  make down         - Stop Docker services"
	@echo "  make dev-frontend - Start Next.js frontend (local)"
	@echo "  make logs         - View Medusa logs (container)"
	@echo "  make clean        - Clean up containers and local dependencies"
	@echo "  make all          - Full setup (setup + up + dev-frontend)"
	@echo "  make help         - Show this help"