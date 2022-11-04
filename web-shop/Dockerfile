FROM ubuntu:latest
LABEL Stefan Dunkler
WORKDIR /app
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r /app/requirements.txt
RUN apt-get update; apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -yq nodejs
RUN npm install -g npm
COPY ./package.json /app/package.json
RUN npm install
COPY . /app
WORKDIR /app
RUN npx webpack --config webpack.config.js
CMD [ "uwsgi", "--ini", "wsgi.ini" ]
