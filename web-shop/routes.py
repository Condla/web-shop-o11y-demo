from flask import request, render_template, redirect, url_for, session, flash
import json
import requests
from flask import current_app as app
import uuid

shopping_cart_url = "http://shopping-cart:5555"
products_url = "http://products:8080"


@app.route('/cart', methods=["GET", "POST"])
def view_cart():
    person = request.args.get("name")
    checkout = request.args.get("checkout")
    discount = request.args.get("discount")
    headers = {'Content-type': 'application/json'}
    request_string = "{}/cart/{}".format(shopping_cart_url, person)



    if request.method == "POST" and discount:
        apply_discount(person, headers, request_string)

    if request.method == "POST" and not discount:
        check_out_cart(checkout, headers, request_string, person)
    
    items = get_items_from_shopping_cart(request_string) 
    app.logger.info(app.app_agent_receiver_endpoint)
    return render_template('cart.html', items=items, person=person, app_agent_receiver_endpoint=app.app_agent_receiver_endpoint)

@app.route('/shop', methods=["GET", "POST"])
def view_shop():
    person = request.args.get("name")
    #person = session['username']
    product_name = request.args.get("product")
    headers = {'Content-type': 'application/json'}
    request_string = "{}/products/".format(products_url)
    
    products = get_products(request_string)

    if request.method == "POST" and product_name:
        add_to_shopping_cart(person, product_name, headers)
    
    #flash("session id" + session.get("id"))
        
    app.logger.info("Showing web interface.") 
    return render_template('index.html', products=products, person=person, app_agent_receiver_endpoint=app.app_agent_receiver_endpoint)

def add_to_shopping_cart(person, product_name, headers):
    request_string = "{}/cart/{}".format(shopping_cart_url, person)
    payload = {"product": product_name}
    response = requests.post(request_string, json=payload,headers=headers)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
      app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
    else:
      app.logger.info("Successfully added item to shopping cart.")

def get_products(request_string):
    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from products service. Something is wrong.")
    else:
        app.logger.info("Retrieved available items from products service. Displaying items.")
        products = response.json()
        app.logger.info("Successfully obtained items from shopping cart")
    return products

def check_out_cart(checkout, headers, request_string, person):
    items = get_items_from_shopping_cart(request_string)
    if checkout:
        order_uuid = uuid.uuid4()
        order_request_string = "{}/order/{}".format(shopping_cart_url, order_uuid)
        payload = json.loads('{"name": "' + person + '"}')
        app.logger.debug("Trying to create order {}".format(order_uuid))
        response = requests.post(order_request_string, json=payload, headers=headers)
        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
            app.logger.exception("Could not create order {} ".format(order_uuid))
        else:
            app.logger.info("Created order {}.".format(order_uuid))

        for item in items:
            product_request_string = "{}/products/checkout".format(products_url)
            payload = item
            response = requests.post(product_request_string, json=payload, headers=headers )
            if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
              app.logger.exception("Could not check out item.")
            else:
              app.logger.info("Checked out item.")
    response = requests.delete(request_string, headers=headers)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
    else:
        app.logger.info("Successfully emptied shopping cart.")

def apply_discount(person, headers, request_string):
    request_string_discount = request_string + "/discount"
    response = requests.post(request_string_discount,json={"name": person}, headers=headers)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Bad response from discount service. HTTP Status Code: {}".format(response.status_code))
    else:
        app.logger.info("discount applied successfully.")

def get_items_from_shopping_cart(request_string):
    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        items = []
        app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
    else:
        items = response.json()
        app.logger.info("Successfully obtained items from shopping cart")
    return items

# Route for handling the login page logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('view_shop', name=request.form['username']))
    return render_template('login.html', error=error)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',port=3389)
