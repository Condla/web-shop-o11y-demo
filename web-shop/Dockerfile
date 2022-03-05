FROM ubuntu:latest
LABEL Stefan Dunkler
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get install -yq npm nodejs
RUN npm init -y
RUN npm install --save @opentelemetry/api @opentelemetry/sdk-trace-base @opentelemetry/sdk-trace-web @opentelemetry/instrumentation-document-load @opentelemetry/context-zone

COPY . /app
WORKDIR /app
ENTRYPOINT [ "python3" ]
CMD [ "web-shop.py" ]
