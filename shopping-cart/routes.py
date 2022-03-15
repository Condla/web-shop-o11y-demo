from flask import request, jsonify, Response
from flask import current_app as app
import logging, json
from models import db, Customer, Cart, CartItem, Product

def get_or_setup_customer(customer_name):
  try:
    logging.debug("Check for customer in database.")
    customer = Customer.query.filter_by(name=customer_name).first()
  except:
    logging.exception("Customer couldn't be queried from database.")

  if not customer:
    logging.info("No Customer with this name found. Creating new Customer.")
    customer = Customer(name=customer_name)
    try:
      db.session.add(customer)
      db.session.commit()
    except:
      logging.exception("Customer couldn't be created due to database exception.")
  return customer

def get_or_setup_cart(customer):
  try:
    logging.debug("Look up existing cart of customer")
    cart = Cart.query.filter_by(customer=customer).first()
  except:
    logging.exception("Shopping cart couldn't be looked up due to database exception.")
  if not cart:
    logging.info("No shopping cart for this customer found. Creating new cart.")
    cart = Cart(customer=customer)
    try:
      db.session.add(cart)
      db.session.commit()
    except:
      logging.exception("Shopping cart couldn't be created due to database exception.")
  return cart


@app.route('/cart/<customer_name>', methods=["GET"])
def get_cart_items(customer_name):
    response_object = {"response": "Exception"}
    status_code = 500
    customer = get_or_setup_customer(customer_name)
    cart = get_or_setup_cart(customer)
    cart_items = []
    try:
      cart_items = CartItem.query.filter_by(cart=cart).all()
 #     cart_items = CartItem.query.filter_by(cart=cart)\
 #       .join(Cart, Cart.id == CartItem.cart_id)\
 #       .join(Customer, Customer.id == Cart.customer_id)\
 #       .join(Product, Product.id == CartItem.product_id)\
 #       .add_columns(Product.name).all()
      response_object = [cart_item for cart_item in cart_items]
      status_code = 200
    except:
      logging.exception("Could not retrieve cart items due to database exception.")
    logging.info("Successfully retrieved shopping cart of customer.")
    return jsonify(response_object), status_code

@app.route('/cart/<customer_name>', methods=["POST"])
def post_cart_items(customer_name):
    response_object = {"response": "Exception"}
    status_code = 500 
    customer = get_or_setup_customer(customer_name)
    cart = get_or_setup_cart(customer)
    try:
      logging.info("Getting payload sent with POST request.")
      res = request.get_json()
      product_name = res['product']
    except:
      logging.exception("There was an issue with the submitted payload. Possibly a request header is missing 'Content-Type: application/json'")
    
    try:
      logging.info("Retrieving product.")
      product = Product.query.filter_by(name=product_name).first()
    except:
      logging.exception("There was an issue retrieving the product from the database.")

    if not product:
      logging.error("Product that you wanted to add to shopping cart could not be found in database.")
      return jsonify({"product name": product_name}), status_code
    
    try:
      logging.info("Checking if cart_item already in shopping cart.")
      cart_item = CartItem.query.filter_by(product=product, cart=cart).first()
    except:
      logging.exception("There was an issue retrieving cart_item from the database")
    if not cart_item:
      logging.debug("Cart item not in shopping cart. Creating new one.")
      cart_item = CartItem(product=product, cart=cart, quantity=1)
    else:
      logging.debug("Cart item already in shopping cart. Increasing quantity.")
      cart_item.quantity += 1
    try:
      db.session.add(cart_item)
      db.session.commit()
      response_object = cart_item
      status_code = 201
    except:
      logging.exception("Could not persist cart item in database.")

    logging.info("Successfully added item to shopping cart.")
    return jsonify(response_object), status_code
    
@app.route('/cart/<customer_name>', methods=["DELETE"])
def delete_cart_items(customer_name):
    response_object = {"response": "Exception"}
    status_code = 500
    customer = get_or_setup_customer(customer_name)
    cart = get_or_setup_cart(customer)
    try:
      cart_items = db.session.query(CartItem).filter_by(cart=cart).delete(synchronize_session=False)
      db.session.commit()
      response_object = cart_items
      status_code = 200
    except:
      logging.exception("Could not delete shopping cart due to a database error.")
    logging.info("Successfully deleted shopping cart from user.")
    return jsonify(response_object), status_code