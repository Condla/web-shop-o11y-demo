export MIMIR_URL=YOURURL
export MIMIR_USR=YOURUSER
export MIMIR_KEY=YOURKEY

export LOKI_URL=YOURUSER:YOURKEY@YOURURL

export TEMPO_URL=YOURURL
export TEMPO_USR=YOURUSER
export TEMPO_KEY=YOURKEY

kubectl apply -f kubernetes/fullstack-with-grafana-cloud/01-namespace.yaml

envsubst < kubernetes/fullstack-with-grafana-cloud/02-agent.yaml | kubectl apply -f -

export APP_RECEIVER=$(kubectl get service -n web-shop-app grafana-agent-external  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

envsubst < kubernetes/fullstack-with-grafana-cloud/03-web-shop.yaml | kubectl apply -f -