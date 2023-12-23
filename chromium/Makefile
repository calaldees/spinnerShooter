DOCKER_IMAGE:=build-chromium

build_x86:
	docker build --tag ${DOCKER_IMAGE} .

build_raspbian:
	docker build --tag ${DOCKER_IMAGE} --file raspbian-bookworm-arm64.Dockerfile
