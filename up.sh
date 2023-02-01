#/bin/bash

# insert your public IP or URL here
export PUBLIC_APP_URL=${PUBLIC_APP_URL:=grafana.datahovel.com}
#export PUBLIC_APP_URL=${PUBLIC_APP_URL:=localhost}

docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions && sudo systemctl restart docker
docker plugin ls
#docker-compose up -d --build
docker-compose up -d
