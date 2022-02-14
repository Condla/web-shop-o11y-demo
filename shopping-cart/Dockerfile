FROM ubuntu:latest
LABEL Stefan Dunkler
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential libmariadb-dev
#RUN apk add gcc musl-dev mariadb-connector-c-dev
#RUN apk add libc-dev libstdc++
#RUN apk add g++
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
COPY . /app
WORKDIR /app
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]
