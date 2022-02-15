from flask import Flask, request, Response
import random
import requests
import logging
import json
from prometheus_flask_exporter import PrometheusMetrics
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Configure Logging
logging.basicConfig(level=logging.DEBUG,format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

# Configure Tracing
### if resource doesn't set service.name it shows as "unknown_service"
resource = Resource(attributes={"service.name": "web-shop"})
trace.set_tracer_provider(TracerProvider(resource=resource))
otlp_exporter = OTLPSpanExporter(endpoint="http://tempo:4317", insecure=True)
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)
tracer = trace.get_tracer(__name__)
#this will propagate the span to the other microservice
RequestsInstrumentor().instrument()

app = Flask(__name__)

## Get full details on Flask app
FlaskInstrumentor().instrument_app(app)

## Get Prometheus stats of Flask app
PrometheusMetrics(app)

shopping_cart_url = "shopping-cart:5555"

@app.route('/start')
def start():
    return 200

@app.route('/show_shopping_cart')
def show_shopping_cart():
  with tracer.start_as_current_span("show_shopping_cart") as sp:
    trace_id = sp.get_span_context().trace_id
    person = request.args.get("name")
    request_string = "http://{}/cart/{}".format(shopping_cart_url, person)
    response = requests.get(request_string)
    items = response.json()
    item = ''
    if items:
        item = items[0]
    app.logger.info("item={} traceID={}".format(item, format(trace_id, 'x')))
  return item

@app.route('/add_to_shopping_cart')
def add_to_shopping_cart():
  with tracer.start_as_current_span("add_to_shopping_cart") as sp:
    trace_id = sp.get_span_context().trace_id
    person = request.args.get("name")
    product_name = request.args.get("product")
    payload = {"product": product_name}
    request_string = "http://{}/cart/{}".format(shopping_cart_url, person)
    headers = {'Content-type': 'application/json'}
    response = requests.post(request_string, json=payload,headers=headers)
    app.logger.info("Successfully added {} to shopping cart traceID={}".format(product_name, format(trace_id, 'x')))
  return "201"



if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',port=6666)
