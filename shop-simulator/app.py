import requests
import asyncio
import time
import random

products = ["A brand new Ferrari", "Something else expensive", "Dog food"]
actions = ["show", "show", "show", "show", "show", "add", "show", "add", "show", "add"]

async def simulate_online_shopper(name):
  while True:
    action = random.choice(actions)
    product = random.choice(products)
    if action == "show":
        requests.get("http://web-shop:6666/cart?name={}".format(name),headers={'Connection':'close'})

    elif action == "add":
        requests.post("http://web-shop:6666/shop?name={}&product={}".format(name, product), headers={'Connection':'close'})
    
    else:
        requests.get("http://web-shop:6666/nothing".format(name))

    await asyncio.sleep(random.randint(1,5))


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.create_task(simulate_online_shopper('Stefan'))
    loop.create_task(simulate_online_shopper('Willie'))
    loop.create_task(simulate_online_shopper('Aengus'))
    loop.create_task(simulate_online_shopper('Raul'))
    loop.run_forever()
