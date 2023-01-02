

export MIMIR_URL=Heollo
export LOKI_URL=sqdsqd@dsqdsq
export MIMIR_USR=dsqsq
export MIMIR_KEY=fgvcxvcx
export TEMPO_URL=dsqqwww
export TEMPO_USR=dsqqwww
export TEMPO_KEY=xcvcx

kubectl apply -f kubernetes/fullstack-with-grafana-cloud/01-namespace.yaml

envsubst < kubernetes/fullstack-with-grafana-cloud/02-agent.yaml | kubectl apply -f -

export APP_RECEIVER=$(kubectl get service -n web-shop-app grafana-agent-external  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

envsubst < kubernetes/fullstack-with-grafana-cloud/03-web-shop.yaml | kubectl apply -f -