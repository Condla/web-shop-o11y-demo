#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package
#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build /home/app/target/*.jar app.jar
# last tested working build: opentelemetry-javaagent-1.32.0.jar
COPY opentelemetry-javaagent.jar /opentelemetry-javaagent.jar
COPY jmx_prometheus_javaagent-0.17.2.jar /jmx_prometheus_javaagent.jar
COPY httpserver.yml /httpserver.yml
#COPY run.sh /run.sh
#RUN chmod +x /run.sh
EXPOSE 8080
ENTRYPOINT exec java $JAVA_OPTS -jar /app.jar

