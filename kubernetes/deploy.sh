export MIMIR_URL=YOURURL
export MIMIR_USR=YOURUSER
export MIMIR_KEY=YOURKEY

export LOKI_URL=YOURURL
export LOKI_USR=YOURUSR
export LOKI_KEY=YOURKEY

export TEMPO_URL=YOURURL
export TEMPO_USR=YOURUSER
export TEMPO_KEY=YOURKEY

kubectl apply -f kubernetes/01-namespace.yaml

envsubst < kubernetes/02-agent.yaml | kubectl apply -f -

export APP_RECEIVER=$(kubectl get service -n web-shop-app grafana-agent-external  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

echo $APP_RECEIVER

envsubst < kubernetes/03-web-shop.yaml | kubectl apply -f -

#envsubst < kubernetes/04-xk6-browser.yaml | kubectl apply -f -