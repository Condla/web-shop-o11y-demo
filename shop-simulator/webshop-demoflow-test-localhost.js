// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

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
		{"username": "Hans", "cat": "Loki"}
]
});

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
      iterations: 20,
      maxDuration: '1h30m',
      vus: users.length,
//      stages: [
//        { target: 20, duration: '1m' },
//        { target: 20, duration: '2m' },
//        { target: 20, duration: '1m' },
//        { target: 20, duration: '2m' },
//        { target: 20, duration: '2m' },
//        { target: 20, duration: '1m' },
//        { target: 20, duration: '2m' },
//        { target: 20, duration: '2m' },
//        { target: 20, duration: '1m' },
//        { target: 20, duration: '2m' },
//      ],
//      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group(`page_1 - http://localhost:3389/shop?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://localhost:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.6)
  })

  group(`page_2 - http://localhost:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`,
      {
        product: `Meows`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.6)
  })

  group(`page_3 - http://localhost:3389/shop?product=Carlos&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=${users[vu.idInTest -1].cat}&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carlos',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.5)
  })

  group(`page_4 - http://localhost:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2.3)
  })

  group(`page_5 - http://localhost:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://localhost:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(3.4)

    response = http.post(
      `http://localhost:3389/cart?name=${users[vu.idInTest -1].username}`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(3.1)
  })

  group(`page_6 - http://localhost:3389/shop?name=${users[vu.idInTest -1].username}#cats`, function () {
    response = http.get(`http://localhost:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(1.9)
  })

  group(`page_7 - http://localhost:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Loki',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group(`page_8 - http://localhost:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Charlie',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group(`page_9 - http://localhost:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.4)
  })

  group(`page_10 - http://localhost:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://localhost:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.9)
  })
  
  group(`page_11a - http://localhost:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://localhost:3389/cart?name=${users[vu.idInTest -1].username}&discount=true`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.4)
  })
  
  group(`page_11b - http://localhost:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`, function () {
    response = http.post(
      `http://localhost:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://localhost:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
  })
}

