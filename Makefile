GIT_SHA = $(shell git rev-parse --short HEAD)
GUI_IMAGE = "hrazjan/aibabe-gui:dev-$(GIT_SHA)"

.PHONY: generate-svg
generate-svg:
	npx @svgr/cli --typescript --icon --out-dir src/components/icons/generated public/icons
	npx eslint -c .eslintrc.js --fix src/components/icons/generated/*

.PHONY: lint
lint:
	npx eslint -c .eslintrc.js --fix src/*


.PHONY: build-dev
build-dev: 
	if [ -z "$$(docker buildx inspect | grep -E "Driver:\s+docker-container")" ]; then \
		docker buildx create --use; \
	fi
	docker buildx build -f docker/dev/Dockerfile --push --platform linux/amd64 -t "hrazjan/aibabe-gui:dev-$(GIT_SHA)" .

.PHONY: build-qa
build-qa:
	if [ -z "$$(docker buildx inspect | grep -E "Driver:\s+docker-container")" ]; then \
		docker buildx create --use; \
	fi
	docker buildx build -f docker/qa/Dockerfile --push --platform linux/amd64 -t "hrazjan/aibabe-gui:qa-$(GIT_SHA)" .

.PHONY: build-prod
build-prod:
	if [ -z "$$(docker buildx inspect | grep -E "Driver:\s+docker-container")" ]; then \
		docker buildx create --use; \
	fi
	docker buildx build -f docker/prod/Dockerfile --push --platform linux/amd64 -t "hrazjan/aibabe-gui:prod-$(GIT_SHA)" .

build-local-multiplatform:
	if [ -z "$$(docker buildx inspect | grep -E "Driver:\s+docker-container")" ]; then \
		docker buildx create --use; \
	fi
	docker buildx build -f docker/prod/Dockerfile --platform linux/amd64,linux/arm64 -t "hrazjan/aibabe-gui:local-$(GIT_SHA)" .

build-all: build-dev build-qa build-prod

.PHONY: translation
translation:
	yarn extract
	python3 scripts/translate-catalogs-gpt.py --folder src/locales/ --lang cs,es,de,fr,it --bulk --bulksize 100 --folder-language --model chatgpt-4o-latest
	yarn compile