FROM ubuntu:22.04
LABEL Stefan Dunkler
WORKDIR /app
RUN apt-get update -y\
    && apt-get install -y python3-pip python3-dev build-essential nodejs npm curl webpack\ 
    && rm -rf /var/lib/apt/lists/*
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
COPY ./package.json /app/package.json
COPY . /app
WORKDIR /app
RUN npm install -D webpack-cli
RUN npx webpack --config webpack.config.js
CMD [ "uwsgi", "--ini", "wsgi.ini" ]
