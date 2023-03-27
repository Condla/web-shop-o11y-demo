// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const users = new SharedArray('shop users', function() {
  return	[
		{"username": "Stefan", "cat": "Meows"},
		{"username": "Kris", "cat": "Thor"},
		{"username": "Raul", "cat": "Charlie"},
		{"username": "Andreas", "cat": "Loki"},
		{"username": "Willie", "cat": "Carla"},
		{"username": "Aengus", "cat": "Meows"},
		{"username": "Paul", "cat": "Charlie"},
		{"username": "Emil", "cat": "Loki"},
		{"username": "Kris", "cat": "Carla"},
		{"username": "Cyril", "cat": "Carla"},
		{"username": "Devin", "cat": "Charlie"},
		{"username": "Mattias", "cat": "Meows"},
		{"username": "Alain", "cat": "Charlie"},
		{"username": "Nabeel", "cat": "Loki"},
		{"username": "Kris", "cat": "Loki"},
		{"username": "Inge", "cat": "Charlie"},
		{"username": "Andreas", "cat": "Loki"},
		{"username": "Ivan", "cat": "Carla"},
		{"username": "Emil", "cat": "Charlie"},
		{"username": "Ward", "cat": "Meows"},
		{"username": "Hans", "cat": "Loki"}
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
      vus: users.length,
      exec: 'scenario_1',
    },
    Scenario_2: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '1m', target: 10},
        { duration: '1m', target: 0},
        { duration: '1m', target: 10},
        { duration: '10m',target: 0},
        { duration: '1m', target: 10},
        { duration: '10m', target: 0},
        { duration: '10m', target: 10},
      ],
      gracefulRampDown: '0s',
      exec: 'scenario_2',
    },
  },
}

export function scenario_1() {
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
    sleep(2)
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
    sleep(2)
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
    sleep(2)
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
    sleep(2)
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
    sleep(2)
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
    sleep(2)
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
    sleep(2)
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
      `http://${__ENV.HOSTNAME}:3389/shop?product=Loki&name=${randomUser}`,
      {
        product: "Loki"
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