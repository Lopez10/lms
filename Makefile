# Helpers
IS_DARWIN := $(filter Darwin,$(shell uname -s))

define set_env
	sed $(if $(IS_DARWIN),-i "",-i) -e "s/^#*\($(1)=\).*/$(if $(2),,#)\1$(2)/" .env
endef

EXEC := docker compose exec node

# Environment recipes
.PHONY: default
default: up

.PHONY: up
up:
	DOCKER_BUILDKIT=1 docker compose up -d --build

.PHONY: down
down:
	docker compose down

.PHONY: shell
shell:
	$(EXEC) zsh

# Project recipes
.PHONY: deps
deps:
	$(EXEC) npm ci

.PHONY: run
run:
	$(EXEC) npm run dev

.PHONY: test
test:
	$(EXEC) npm run test

.PHONY: integration
integration:
	DOCKER_BUILDKIT=1 docker-compose -f docker-compose.integration.yml up -d --build

	@echo "Waiting for MySQL to be ready..."
	@until docker-compose exec mysql_test mysqladmin ping -h localhost --silent; do \
		echo "MySQL is unavailable - sleeping"; \
		sleep 1; \
	done
	@sleep 5
	@echo "MySQL is up - continuing..."
	@echo "Running integration tests..."
	npm run test:integration

	@echo "Stopping Docker containers..."
	docker-compose -f docker-compose.integration.yml down