from flask import request, render_template
import requests
from flask import current_app as app

shopping_cart_url = "http://shopping-cart:5555"
products_url = "http://products:8080"

@app.route('/cart', methods=["GET", "POST"])
def view_cart():
    person = request.args.get("name")
    checkout = request.args.get("checkout")
    request_string = "{}/cart/{}".format(shopping_cart_url, person)
    product_stream = "{}/product"
    headers = {'Content-type': 'application/json'}
    
    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
    else:
        app.logger.info("Retrieved items from shopping cart. Displaying items.")
        items = response.json()
        app.logger.info("Successfully obtained items from shopping cart")

    if request.method == "POST":
        response = requests.delete(request_string, headers=headers)
        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
            app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
        else:
            app.logger.info("Successfully emptied shopping cart.")
            if checkout:
                if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
                   app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
                else:
                    for item in items:
                        request_string = "{}/products/checkout".format(products_url)
                        payload = item
                        response = requests.post(request_string, json=payload, headers=headers)
                        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
                          app.logger.exception("Could not check out item.")
                        else:
                          app.logger.info("Checked out item.")

    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
    else:
        app.logger.info("Retrieved items from shopping cart. Displaying items.")
        items = response.json()
        app.logger.info("Successfully obtained items from shopping cart")
    return render_template('cart.html', items=items, person=person)

@app.route('/shop', methods=["GET", "POST"])
def view_shop():
    person = request.args.get("name")
    product_name = request.args.get("product")
    headers = {'Content-type': 'application/json'}
    request_string = "{}/products/".format(products_url)
    
    response = requests.get(request_string)
    if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
        app.logger.exception("Got a real bad response from products service. Something is wrong.")
    else:
        app.logger.info("Retrieved available items from products service. Displaying items.")
        products = response.json()
        app.logger.info("Successfully obtained items from shopping cart")

    ### add to shopping cart
    if request.method == "POST":
        request_string = "{}/cart/{}".format(shopping_cart_url, person)
        payload = {"product": product_name}
        response = requests.post(request_string, json=payload,headers=headers)
        if not (response.status_code == 200 or response.status_code == 201 or response.status_code == 202):
          app.logger.exception("Got a real bad response from shopping cart. Something is wrong.")
        else:
          app.logger.info("Successfully added item to shopping cart.")
        
    app.logger.info("Showing web interface.") 
    return render_template('index.html', products=products, person=person)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0',port=6666)
