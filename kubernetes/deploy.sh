source set_env.sh
export NAMESPACE=grafana
export METRICS_USER=$METRICS_USER
export METRICS_PASSWORD=$METRICS_PASSWORD
export LOGS_USER=$LOGS_USER
export LOGS_PASSWORD=$LOGS_PASSWORD
export TRACES_USER=$TRACES_USER
export TRACES_PASSWORD=$TRACES_PASSWORD
#deploy application
kubectl apply -f web-shop-app.yaml

#deploy agent configs
cat << EOF | envsubst | kubectl apply -n $NAMESPACE -f-
`cat agent-config-map.yaml`
EOF

cat << EOF | envsubst | kubectl apply -n $NAMESPACE -f-
`cat agent-config-map-logs.yaml`
EOF

cat << EOF | envsubst | kubectl apply -n $NAMESPACE -f-
`cat agent-config-map-traces.yaml`
EOF

#deploy ksm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts && helm repo update && helm install ksm prometheus-community/kube-state-metrics --set image.tag=v2.4.2 -n $NAMESPACE

#deploy agents
MANIFEST_URL=https://raw.githubusercontent.com/grafana/agent/v0.27.1/production/kubernetes/agent-bare.yaml NAMESPACE=$NAMESPACE /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/grafana/agent/v0.27.1/production/kubernetes/install-bare.sh)" | kubectl apply -f -

MANIFEST_URL=https://raw.githubusercontent.com/grafana/agent/v0.27.1/production/kubernetes/agent-loki.yaml NAMESPACE=$NAMESPACE /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/grafana/agent/v0.27.1/production/kubernetes/install-bare.sh)" | kubectl apply -f -

MANIFEST_URL=https://raw.githubusercontent.com/grafana/agent/v0.27.0/production/kubernetes/agent-traces.yaml NAMESPACE=$NAMESPACE /bin/sh -c "$(curl -fsSL https://raw.githubusercontent.com/grafana/agent/v0.27.0/production/kubernetes/install-bare.sh)" | kubectl apply -f -


