FROM ubuntu:latest
LABEL Stefan Dunkler
WORKDIR /app
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
COPY . /app

ENTRYPOINT [ "python3" ]
CMD [ "web-shop.py" ]
