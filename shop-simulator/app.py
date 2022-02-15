import requests
import asyncio
import time
import random

products = ["Nintendo Switch", "iPhone"]
actions = ["show", "show", "show", "show", "show", "add", "show", "add", "show", "add"]

async def simulate_online_shopper(name):
  while True:
    action = random.choice(actions)
    product = random.choice(products)
    if action == "show":
        requests.get("http://web-shop:6666/show_shopping_cart?name={}".format(name),headers={'Connection':'close'})

    elif action == "add":
        requests.get("http://web-shop:6666/add_to_shopping_cart?name={}&product={}".format(name, product), headers={'Connection':'close'})
    
    elif action == "remove":
        requests.get("http://web-shop:6666/empty_shopping_cart?name={}".format(name), headers={'Connection':'close'})

    else:
        requests.get("http://web-shop:6666/doesnt_exist".format(name))

    await asyncio.sleep(random.randint(1,5))


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.create_task(simulate_online_shopper('stefan'))
    loop.create_task(simulate_online_shopper('kris'))
    loop.create_task(simulate_online_shopper('konrad'))
    loop.run_forever()
