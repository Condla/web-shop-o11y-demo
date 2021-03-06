import requests
import asyncio
import time
import random

products = ["Loki", "Carla", "Telescope", "Charlie"]
actions = ["show", "show", "show", "show", "show", "add", "show", "show", "show", "show", "add", "show", "add", "checkout"]
customers = ["Willie", "Cyril", "Devin", "Aengus", "Abdelkrim", "Raul", "Ward", "Nabeel"]

async def simulate_online_shopper(name):
  while True:
    action = random.choice(actions)
    product = random.choice(products)
    if action == "show":
        requests.get("http://web-shop:6666/cart?name={}".format(name),headers={'Connection':'close'})

    elif action == "add":
        requests.post("http://web-shop:6666/shop?name={}&product={}".format(name, product), headers={'Connection':'close'})
    
    elif action == "checkout":
        requests.post("http://web-shop:6666/cart?name={}&checkout=true".format(name))

    await asyncio.sleep(random.randint(1,5))

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    for customer in customers:
        for item in range(random.randint(1,100)):
            loop.create_task(simulate_online_shopper(customer))
    loop.run_forever()
