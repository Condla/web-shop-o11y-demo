#/bin/bash

# insert your public IP or URL here
export PUBLIC_APP_URL=${PUBLIC_APP_URL:=grafana.datahovel.com}
#export PUBLIC_APP_URL=${PUBLIC_APP_URL:=localhost}

docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions && sudo systemctl restart docker
docker plugin ls

OTEL_JAR="products/opentelemetry-javaagent.jar"
test -f "$OTEL_JAR" || wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.23.0/opentelemetry-javaagent.jar -O $OTEL_JAR

JMX_JAR="products/jmx_prometheus_javaagent-0.17.2.jar"
test -f "$JMX_JAR" || wget https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.17.2/jmx_prometheus_javaagent-0.17.2.jar -O $JMX_JAR

if [ "$1" == "build" ]
    then
	docker-compose up -d --build
    else
	docker-compose up -d
fi
