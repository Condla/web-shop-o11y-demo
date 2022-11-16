import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { chromium } from 'k6/x/browser';
import exec from 'k6/execution';
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

let user= "Emil";

export const options = {
   scenarios: {
     front_end_scenario: {
       executor: 'constant-vus',
       exec: 'browser',
       vus: 1,
       duration: '1m',
     },
     back_end_scenario: {
       executor: 'constant-vus',
       exec: 'backend',
       vus: 10,
       duration: '1m',
     },
   },
 };

export function browser() {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms',
  });

  const context = browser.newContext({
        screen: {width: 1024, height: 768},
        viewport: { width: 1024, height: 768}
  });
  const page = context.newPage();
  page.goto(`http://${__ENV.HOSTNAME}:3389/shop?name=`+user);

  let selector, elem;

  page.mouse.click(344, 402);
  sleep(1);
  page.mouse.click(530, 410);
  sleep(1);

  selector='[href="/cart?name='+user+'"]';
  elem = page.$(selector);
  elem.click();

  sleep(1);

  selector='.w3-main';
  elem = page.$(selector);

  let re= /Loki\s*(.*)\s*(.*)\s*(.*)\s*Meows\s*(.*)\s*(.*)\s*(.*)\s*/;
  let match = elem.textContent().match(re);
  if(match== null) {
    re= /Meows\s*(.*)\s*(.*)\s*(.*)\s*Loki\s*(.*)\s*(.*)\s*(.*)\s*/;
    match = elem.textContent().match(re);
  }

  let total= Number(match[3])+Number(match[6]);
  console.log("Total: "+total);

  check(page, { in: "69.98"== total});

  sleep(1);

//  page.screenshot({ path:"kitties.png" });

  selector='[name="checkout_cart"]';
  elem = page.$(selector);
  elem.click();

  sleep(1);

  selector="[id='myBtn']";
  elem = page.$(selector);
  elem.click();
  sleep(1);
  elem.click();
  sleep(1);

  selector="[onclick='do_something_cool()']";
  elem = page.$(selector);
  elem.click();
  sleep(1);

  page.close();
  browser.close();
}






const users = new SharedArray('shop users', function() {
  return	[
		{"username": "Stefan", "cat": "Loki"},
		{"username": "Carlos", "cat": "Thor"},
		{"username": "Raul", "cat": "Loki"},
		{"username": "Abdelkrim", "cat": "Loki"},
		{"username": "Willie", "cat": "Loki"},
		{"username": "Aengus", "cat": "Loki"},
		{"username": "Ward", "cat": "Loki"},
		{"username": "Emil", "cat": "Loki"},
		{"username": "Dave", "cat": "Loki"},
		{"username": "Cyril", "cat": "Loki"},
		{"username": "Devin", "cat": "Loki"},
		{"username": "Mattias", "cat": "Loki"},
		{"username": "Alain", "cat": "Loki"},
		{"username": "Nabeel", "cat": "Loki"},
		{"username": "Kris", "cat": "Loki"},
		{"username": "Konrad", "cat": "Loki"},
		{"username": "Federica", "cat": "Loki"},
		{"username": "Simon", "cat": "Loki"},
		{"username": "Andreas", "cat": "Loki"},
		{"username": "Hans", "cat": "Loki"},
		{"username": "Matt", "cat": "Meows"},
		{"username": "Jake", "cat": "Loki"},
		{"username": "Franka", "cat": "Loki"},
		{"username": "Abdi", "cat": "Meows"}
]
});

export function backend() {
  let response

  group(`page_1 - http://${__ENV.HOSTNAME}:3389/shop?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.6)
  })

  group(`page_2 - http://${__ENV.HOSTNAME}:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`,
      {
        product: `Meows`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.6)
  })

  group(`page_3 - http://${__ENV.HOSTNAME}:3389/shop?product=Carlos&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=${users[vu.idInTest -1].cat}&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carlos',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.5)
  })

  group(`page_4 - http://${__ENV.HOSTNAME}:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2.3)
  })

  group(`page_5 - http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(3.4)

    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(3.1)
  })

  group(`page_6 - http://${__ENV.HOSTNAME}:3389/shop?name=${users[vu.idInTest -1].username}#cats`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(1.9)
  })

  group(`page_7 - http://${__ENV.HOSTNAME}:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Loki',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group(`page_8 - http://${__ENV.HOSTNAME}:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Charlie',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group(`page_9 - http://${__ENV.HOSTNAME}:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.4)
  })

  group(`page_10 - http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.9)
  })

  group(`page_11a - http://${__ENV.HOSTNAME}:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}&discount=true`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.4)
  })

  group(`page_11b - http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
  })
}
