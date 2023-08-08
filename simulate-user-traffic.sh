#docker run --network web-shop-o11y-demo_web-shop --rm -i grafana/k6  run -e HOSTNAME=${PUBLIC_APP_URL:=web-shop} - <shop-simulator/webshop-protocol-demo.js
#docker run --network web-shop-o11y-demo_web-shop --rm -i grafana/k6  run -e HOSTNAME=${PUBLIC_APP_URL:=web-shop} - <shop-simulator/webshop-protocol-demo-phones.js
#docker run --network web-shop-o11y-demo_web-shop --rm -i grafana/k6  run -e HOSTNAME=${PUBLIC_APP_URL:=web-shop} - <shop-simulator/webshop-protocol-demo-energy.js
docker run --network web-shop-o11y-demo_web-shop --rm -i grafana/k6  run -e HOSTNAME=${PUBLIC_APP_URL:=web-shop} - <shop-simulator/webshop-protocol-demo-food.js

