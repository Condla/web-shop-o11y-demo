#/bin/bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions && sudo systemctl restart docker
docker plugin ls
wget -O opentelemetry-javaagent.jar https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
docker-compose up -d
