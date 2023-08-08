// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const users = new SharedArray('shop users', function() {
  return	[
		{"username": "Stefan", "cat": "Chicken"},
		{"username": "Kris", "cat": "Schnitzel"},
		{"username": "Raul", "cat": "Shrimps"},
		{"username": "Andreas", "cat": "Salmon"},
		{"username": "Willie", "cat": "Pasta"},
		{"username": "Aengus", "cat": "Chicken"},
		{"username": "Paul", "cat": "Shrimps"},
		{"username": "Emil", "cat": "Salmon"},
		{"username": "Kris", "cat": "Pasta"},
		{"username": "Cyril", "cat": "Pasta"},
		{"username": "Devin", "cat": "Shrimps"},
		{"username": "Mattias", "cat": "Chicken"},
		{"username": "Alain", "cat": "Shrimps"},
		{"username": "Nabeel", "cat": "Salmon"},
		{"username": "Kris", "cat": "Salmon"},
		{"username": "Inge", "cat": "Shrimps"},
		{"username": "Andreas", "cat": "Salmon"},
		{"username": "Ivan", "cat": "Pasta"},
		{"username": "Emil", "cat": "Shrimps"},
		{"username": "Ward", "cat": "Chicken"},
		{"username": "Hans", "cat": "Salmon"}
]
});

const usersScenario2 = new SharedArray('other shop users', function(){
  return [
    "Ragnar", "Olaf", "Gustaf", "Sven", "Olof", "Roderik", "Bjorn", "Kalle", "Linda", "Olle", "Harald", "John", "Isidor", "Isildur", "Aragorn", "Legolas", "Gimli", "Gandalf", "Ed", "Bo"
  ]
})

export const options = {
  ext: {
    loadimpact: {
      projectID: 3569409,
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 20 },
        'amazon:fr:paris': { loadZone: 'amazon:fr:paris', percent: 80 },
      },
      apm: [],
      name: "Webshop Test"
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'per-vu-iterations',
      gracefulStop: '30s',
      iterations: 1000,
      maxDuration: '2h30m',
      vus: 5,
      exec: 'scenario_1',
    },
    Scenario_2: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '1m', target: 5},
        { duration: '1m', target: 2},
        { duration: '1m', target: 5},
        { duration: '10m',target: 2},
        { duration: '1m', target: 5},
        { duration: '10m', target: 2},
        { duration: '10m', target: 5},
      ],
      gracefulRampDown: '0s',
      exec: 'scenario_2',
    },
  },
}

export function scenario_1() {
  let response
  const user = users[Math.floor(Math.random() * users.length)];
  group(`page_1 - http://${__ENV.HOSTNAME}:3389/shop?name=${user.username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/shop?name=${user.username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.6)
  })

  group(`page_2 - http://${__ENV.HOSTNAME}:3389/shop?product=Chicken&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Chicken&name=${user.username}`,
      {
        product: `Chicken`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)
  })

  group(`page_3 - http://${__ENV.HOSTNAME}:3389/shop?product=Carlos&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=${user.cat}&name=${user.username}`,
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
    sleep(2)
  })

  group(`page_4 - http://${__ENV.HOSTNAME}:3389/shop?product=Pasta&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Pasta&name=${user.username}`,
      {
        product: 'Pasta',
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

  group(`page_5 - http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(3.4)

    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}`,
      {
        name: `${user.username}`,
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

  group(`page_6 - http://${__ENV.HOSTNAME}:3389/shop?name=${user.username}#cats`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/shop?name=${user.username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2)
  })

  group(`page_7 - http://${__ENV.HOSTNAME}:3389/shop?product=Salmon&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Salmon&name=${user.username}`,
      {
        product: 'Salmon',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)
  })

  group(`page_8 - http://${__ENV.HOSTNAME}:3389/shop?product=Shrimps&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Shrimps&name=${user.username}`,
      {
        product: 'Shrimps',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)
  })

  group(`page_9 - http://${__ENV.HOSTNAME}:3389/shop?product=Pasta&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Pasta&name=${user.username}`,
      {
        product: 'Pasta',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)
  })

  group(`page_10 - http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.9)
  })
  
  group(`page_11a - http://${__ENV.HOSTNAME}:3389/shop?product=Pasta&name=${user.username}`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}&discount=true`,
      {
        name: `${user.username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)
  })
  
  group(`page_11b - http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}&checkout=true`, function () {
    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${user.username}&checkout=true`,
      {
        name: `${user.username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: `http://${__ENV.HOSTNAME}:3389`,
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(10)
  })
}

export function scenario_2() {
  let response
  const randomUser = usersScenario2[Math.floor(Math.random() * usersScenario2.length)];
  group(`page_1 - http://${__ENV.HOSTNAME}:3389/shop?name=${randomUser}#cats`, function () {


    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/shop?product=Salmon&name=${randomUser}`,
      {
        product: "Salmon"
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://${__ENV.HOSTNAME}:3389',
          'upgrade-insecure-requests': '1',
        },


      }
    )
    sleep(1)
  })

  group(`page_2 - http://${__ENV.HOSTNAME}:3389/cart?name=${randomUser}`, function () {
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${randomUser}`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9,de-AT;q=0.8,de;q=0.7',
      },
    })
    sleep(0.6)

    response = http.post(
      `http://${__ENV.HOSTNAME}:3389/cart?name=${randomUser}&checkout=true`,
      '{"name":"${randomUser}"}',
      {
        headers: {
          'content-type': 'application/json',
          accept: '*/*',
          origin: `http://${__ENV.HOSTNAME}:3389`,
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9,de-AT;q=0.8,de;q=0.7',
        },
      }
    )
    sleep(0.6)
    response = http.get(`http://${__ENV.HOSTNAME}:3389/cart?name=${randomUser}`, {
      headers: {
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en;q=0.9,de-AT;q=0.8,de;q=0.7',
      },
    })
    sleep(0.6)
  })

}
