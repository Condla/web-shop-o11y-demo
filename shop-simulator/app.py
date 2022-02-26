import requests
import asyncio
import time
import random

products = ["Nintendo Switch", "Harley Davidson", "Telescope", "Golf Clubs", "Tennis Racket"]
actions = ["show", "show", "show", "show", "show", "add", "show", "add", "show", "add"]
customers = ["Willie", "Aengus", "Devin", "Cyril", "Abdelkrim", "Raul", "Ward", "Nabeel"]

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
    for item in range(100):
      for customer in customers:
        loop.create_task(simulate_online_shopper(customer))
    loop.run_forever()
