#FROM ubuntu:latest
FROM python:3.9-slim
LABEL Stefan Dunkler
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
COPY . /app
WORKDIR /app
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]
