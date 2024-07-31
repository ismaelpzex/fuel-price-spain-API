include .env

DOCKER_COMPOSE_COMMAND ?= docker-compose


build:
	@echo "Building API"
	@${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml build database adminer fuel-price

start:
	@echo "Starting API"
	@${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml up -d
	@${DOCKER_COMPOSE_COMMAND} logs -f database fuel-price

stop:
	@echo "Stopping API"
	@${DOCKER_COMPOSE_COMMAND} down

clean: 
	@read -p "You are about to stop the containers and delete the contents of the database but not the tables. Continue? (y/n): " yn; \
	case "$$yn" in \
		y|Y ) ${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml down; rm -rf ./docker-data/db-data/*; echo "All cleaned, happy code" ;; \
		* ) echo "Aborted" ;; \
	esac

tdd-e2e-fuel-price:
	@echo "\033[0;32mRunning tests e2e for fuel-price\033[0m"
	@${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml -f docker-compose.e2e.yml up fuel-price

tdd-unit-fuel-price:
	@echo "\033[0;32mRunning unit tests for fuel-price\033[0m"
	@${DOCKER_COMPOSE_COMMAND} -f docker-compose.yml -f docker-compose.unit.yml up fuel-price