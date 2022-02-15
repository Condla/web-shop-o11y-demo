from flask import Flask, request, Response
import requests
import mariadb
import json
import logging
from prometheus_flask_exporter import PrometheusMetrics
from opentelemetry import trace
from opentelemetry.instrumentation.dbapi import trace_integration
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Configure Logging
logging.basicConfig(level=logging.DEBUG,format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

# Configure Tracing
### if resource doesn't set service.name it shows as "unknown_service"
resource = Resource(attributes={"service.name": "shopping-cart"})
trace.set_tracer_provider(TracerProvider(resource=resource))
otlp_exporter = OTLPSpanExporter(endpoint="http://tempo:4317", insecure=True)
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

trace_integration(mariadb,"connect","mariadb")
tracer = trace.get_tracer(__name__)

app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)

# Configure Metrics
PrometheusMetrics(app)


config = {
        'host': 'mariadb',
        'port': 3306,
        'user': 'root',
        'password': 'myrootpassword',
}

def initiate_db():
  conn = mariadb.connect(**config)
  cur = conn.cursor()
  cur.execute("CREATE DATABASE IF NOT EXISTS webshop")
  cur.execute("USE webshop")
  cur.execute("CREATE TABLE IF NOT EXISTS shopping_cart (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, customer VARCHAR(30) NOT NULL, product VARCHAR(30) NOT NULL);")
  conn.close()


@app.route('/cart/<customer_name>', methods=["GET", "POST", "DELETE"])
def handle_shopping_cart_items(customer_name):
    status_code = 500
    res = {"success": "false"}
    conn = mariadb.connect(**config)
    cur = conn.cursor()
    cur.execute("USE webshop")
    if request.method == "GET":
      cart_items = []
      try:
        cur.execute("SELECT product FROM shopping_cart WHERE customer='{}'".format(customer_name))
        res = [item[0] for item in cur.fetchall()]
        status_code = 200
        logging.debug("Successfully retrieved items from database")
      except:
        logging.exception("Couldn't access database for reading. Something went wrong.")
  
    elif request.method == "POST":
      try:
        res = request.get_json()
        product_name = res['product']
      except:
        logging.exception("There was an issue with the submitted payload.")
      try:
        cur.execute("INSERT INTO shopping_cart(customer, product) VALUES ('{}', '{}');".format(customer_name, product_name))
        conn.commit()
        status_code = 201
        logging.debug("Successfully persisted items in database")
      except:
        logging.exception("Couldn't access database for writing. Something went wrong.")
    
    elif request.method == "DELETE":
      try: 
        cur.execute("DELETE FROM shopping_cart WHERE customer='{}';".format(customer_name))
        conn.commit()
        status_code = 202
        res = {"success": "true"}
        logging.debug("Successfully removed items in database table")
      except:
        logging.exception("Couldn't access database for deleting. Something went wrong.")
  
    conn.close()
    return Response(json.dumps(res), status=status_code, mimetype='application/json')

if __name__ == '__main__':
    initiate_db()
    # if you set debug to True, then the /metrics endpoint returns 404
    app.run(debug=False, host='0.0.0.0', port=5555)
