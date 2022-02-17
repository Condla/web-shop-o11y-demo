# Web Shop Observability Demo

This is a simple Python demo to show metrics, logs and traces collection with the Grafana stack.

## Overview

This demo spins up a simplified containerized "web shop" service.

Currently, it consists of:
* a user interface that allows you to add items to a shopping cart, as well as delete all items in the shopping cart.
* a shopping cart backend service that interacts with a MariaDB instance. It persists the shopping cart items of the different users.
* a mariadb instance.
* a service that simulates light user traffic by adding things to the shopping cart and navigating the UI.

Additionally, you have the required agents and instrumentation included as well as the backends to collect metrics, logs and traces:
* Grafana to build dashboards and explore the collected telemetry 
* the Grafana agent to scrape metrics, collect logs and traces
* Prometheus to act as the metrics backend
* Grafana Loki to act as the logs backend
* Grafana Tempo to persist trace spans

## Architecture

Quick Overview:
* The shop simulator service as well as navigating the shop UI makes calls to the shopping cart API
* The shopping cart API interacts with MariaDB
* Telemetry is instrumented by using some of the available python otel libraries. It's collected using the OTEL collector and directly sent to Tempo. This can be changed so that telemetry is sent to the grafana agent, which then sends it to Tempo.
* Prometheus is configured to scrape the web shop service as well as the shopping cart API for metrics.
* Logs are collected using the Loki docker plugin. The plugin is configured to send all logs of all docker containers to the Loki instance.

## How To get started

* Step 1: Configure your docker installation to use the Loki docker plugin for logging and point it to your loki instance.
  * Install loki docker driver: ```docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions```
  * Restart docker, e.g. on Linux: ```sudo systemctl restart docker```
  * Check if plugin is enabled: ```docker plugin ls```

* Step 2: Run docker compose. Run it a second time if for some reason the services are faster up than the database
```
docker-compose up -d
```

* Step 3: Go to `<ip>:80/shop?name=<enter a name here>` to see the web shop interface.
  * From here you can add multiple products.
  * The last product will not be added due to a database issue. VARCHAR(30) for product names and the last product is longer than 30 characters.
  * You can also go to the shopping cart to see what's in there so far.
  * You can empty the shopping cart.
  * You should note that everything is there except the last item.

* Step 4: Go to `<ip>:3000` enter `admin/admin` for username and password and change the password.
  * Got to Explore the logs.
  * Filter for Errors and observe some log messages that will give you a hint of what's happened, but not tell the full story.
  * Check out the link to Tempo in one of the error log lines to dig into the details of what happened.
  * A side-by-side view should now give you the complete trace of spans of what happened.
  * You will also see in which services and methods issues were encountered.
  * Drill down to the bottom to find the SQL insert statement as well as the database message that gives away the reason of the error.

* Step 5: Think about how much time this could have saved you in a real life scenario to find the issue.
