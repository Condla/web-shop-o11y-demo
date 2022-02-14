from flask import Flask
import random
import requests
import logging

# Configure Logging
logging.basicConfig(level=logging.DEBUG,format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

app = Flask(__name__)

persons = ["kris", "stefan", "konrad"]
items = ["iPhone", "Nintendo Switch", "Noice Cancelling Headphones"]
shopping_cart_url = "shopping-cart:5555"

@app.route('/show_shopping_cart')
def show_shopping_cart():
  person = random.choice(persons)
  app.logger.info(person)
  request_string = "http://{}/cart/{}".format(shopping_cart_url, person)
  response = requests.get(request_string)
  items = response.json()
  item = ''
  if items:
      item = items[0]
  app.logger.info(item)
  return item


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',port=6666)
