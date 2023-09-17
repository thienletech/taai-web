.PHONY: all
all: clean build run

.PHONY: clean
clean:
	docker stop $$(docker ps -a -q --filter "ancestor=taai-web:latest") || true
	docker rm $$(docker ps -a -q --filter "ancestor=taai-web:latest") || true
	docker rmi -f $$(docker images -q taai-web:latest) || true

.PHONY: build
build:
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker build -t taai-web:latest .

.PHONY: run
run: build
	docker run -d --network="host" taai-web:latest

.PHONY: log
log:
	docker logs -f $$(docker ps -qf "ancestor=taai-web:latest")