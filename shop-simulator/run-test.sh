export HOSTNAME=34.78.246.133
#export HOSTNAME=34.79.93.8
#export HOSTNAME=localhost
docker run --rm -i grafana/k6 run -e HOSTNAME=$HOSTNAME - <webshop-demoflow.js
