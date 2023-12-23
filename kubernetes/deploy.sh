export MIMIR_URL=https://prometheus-prod-10-prod-us-central-0.grafana.net
export MIMIR_USR=364318
export MIMIR_KEY=glc_eyJvIjoiNDkzMTkwIiwibiI6ImNvbmRsYS1taW5pa3ViZSIsImsiOiIzdDY3bUdaOTFRd1k0WDE0dnBobzA1d2ciLCJtIjp7InIiOiJ1cyJ9fQ==

export LOKI_URL=https://logs-prod3.grafana.net 
export LOKI_USR=181129
export LOKI_KEY=$MIMIR_KEY

export TEMPO_URL=https://tempo-us-central1.grafana.net:443 
export TEMPO_USR=177642
export TEMPO_KEY=$MIMIR_KEY

export BROWSER_ENDPOINT=https://faro-collector-prod-us-central-0.grafana.net/collect/fd7d8aadd5870ecae33bbfc1ee28e3e7

# you need kubectl and helm installed on your machine


kubectl apply -f kubernetes/01-namespace.yaml

kubectl apply -f kubernetes/mariadb.yaml
kubectl apply -f kubernetes/kafka-cluster.yaml
kubectl apply -f kubernetes/shopping-cart.yaml
kubectl apply -f kubernetes/products.yaml
envsubst < kubernetes/web-shop.yaml | kubectl apply -f -

#envsubst < kubernetes/04-xk6-browser.yaml | kubectl apply -f -



helm repo add grafana https://grafana.github.io/helm-charts &&
  helm repo update &&
  helm upgrade --install --atomic --timeout 120s grafana-k8s-monitoring grafana/k8s-monitoring \
    --namespace "agent" --create-namespace --values - <<EOF
cluster:
  name: web-shop-cluster
externalServices:
  prometheus:
    host: $MIMIR_URL
    basicAuth: 
      username: "$MIMIR_USR"
      password: $MIMIR_KEY
  loki:
    host: $LOKI_URL
    basicAuth:
      username: "$LOKI_USR"
      password: $LOKI_KEY
  tempo:
    host: $TEMPO_URL
    basicAuth:
      username: "$TEMPO_USR"
      password: $TEMPO_KEY
opencost:
  opencost:
    exporter:
      defaultClusterId: web-shop-cluster
    prometheus:
      external:
        url: $MIMIR_URL/api/prom
traces:
  enabled: true
EOF