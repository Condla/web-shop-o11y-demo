FROM ubuntu:22.04
LABEL Stefan List
WORKDIR /app
RUN apt-get update -y && apt-get install -y python3-pip python3-dev build-essential libmariadb-dev && rm -rf /var/lib/apt/lists/*
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
COPY . /app
WORKDIR /app
CMD [ "uwsgi", "--ini", "wsgi.ini" ]
