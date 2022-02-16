from flask import Flask, request, Response, render_template
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
otlp_exporter = OTLPSpanExporter(endpoint="http://agent:4317", insecure=True)
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

@app.route('/cart', methods=["GET", "POST"])
def view_cart():
  with tracer.start_as_current_span("show_shopping_cart") as sp:
    trace_id = format(sp.get_span_context().trace_id, 'x')
    person = request.args.get("name")
    product_name = request.args.get("product")
    request_string = "http://{}/cart/{}".format(shopping_cart_url, person)
    headers = {'Content-type': 'application/json'}

    if request.method == "POST":
        response = requests.delete(request_string, headers=headers)
        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
            app.logger.exception("Got a real bad response from shopping cart. Something is wrong. traceID={}".format(trace_id))
        else:
            app.logger.info("Successfully emptied shopping cart. traceID={}".format(product_name, trace_id))
    
    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from shopping cart. Something is wrong. traceID={}".format(trace_id))
    else:
        app.logger.info("Retrieved items from shopping cart. Displaying items. traceID={}".format(product_name, trace_id))
        items = response.json()
        app.logger.info("Successfully obtained items from shopping cart. traceID={}".format(trace_id))
  return render_template('cart.html', items=items, person=person)


@app.route('/shop', methods=["GET", "POST"])
def view_shop():
  with tracer.start_as_current_span("add_to_shopping_cart") as sp:
    trace_id = format(sp.get_span_context().trace_id, 'x')
    person = request.args.get("name")
    product_name = request.args.get("product")
    request_string = "http://{}/cart/{}".format(shopping_cart_url, person)
    headers = {'Content-type': 'application/json'}

    ### get list of products and prices (from products service); for now a list.
    products = ['iPhone', 'Nintendo Switch', 'Mountain Bike', 'Running Shoes', 'Grafana Enterprise', 'Grafana Cloud Logs Subscription']

    ### add to shopping cart
    if request.method == "POST":
        payload = {"product": product_name}
        response = requests.post(request_string, json=payload,headers=headers)
        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
          app.logger.error("Got a real bad response from shopping cart. Something is wrong. traceID={}".format(trace_id))
        else:
          app.logger.info("Successfully added item to shopping cart. traceID={}".format(trace_id))
    app.logger.info("Showing web interface. traceID={}".format(trace_id)) 
  return render_template('index.html', products=products, person=person)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',port=6666)
