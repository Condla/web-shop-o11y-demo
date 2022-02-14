from flask import Flask, request, Response
import requests
import mariadb
import json
from prometheus_flask_exporter import PrometheusMetrics
app = Flask(__name__)
PrometheusMetrics(app)

config = {
        'host': 'mariadb',
        'port': 3306,
        'user': 'root',
        'password': 'myrootpassword',
        'database': 'webshop'
}


def initiate_db():
  conn = mariadb.connect(**config)
  cur = conn.cursor()
  cur.execute("CREATE DATABASE IF NOT EXISTS webshop")
  cur.execute("CREATE TABLE IF NOT EXISTS shopping_cart (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, customer VARCHAR(30) NOT NULL, product VARCHAR(30) NOT NULL);")
  conn.close()


@app.route('/cart/<customer_name>', methods=["GET", "POST", "DELETE"])
def handle_shopping_cart_items(customer_name):

  conn = mariadb.connect(**config)
  cur = conn.cursor()
  if request.method == "GET":
    cart_items = []
    try:
      cur.execute("SELECT product FROM shopping_cart WHERE customer='{}'".format(customer_name))
      res = [item[0] for item in cur.fetchall()]
      status_code = 200
    except:
      status_code = 500

  elif request.method == "POST":
    res = request.get_json()
    product_name = res['product']
    try: 
      cur.execute("INSERT INTO shopping_cart(customer, product) VALUES ('{}', '{}');".format(customer_name, product_name))
      conn.commit()
      status_code = 201
    except:
      status_code = 500
  
  elif request.method == "DELETE":
    try: 
      cur.execute("DELETE FROM shopping_cart WHERE customer='{}';".format(customer_name))
      conn.commit()
      status_code = 202
      res = {"success": "true"}
    except:
      status_code = 500

  conn.close()
  return Response(json.dumps(res), status=status_code, mimetype='application/json')

if __name__ == '__main__':
    initiate_db()
    # if you set debug to True, then the /metrics endpoint returns 404
    app.run(debug=False, host='0.0.0.0', port=5555)
