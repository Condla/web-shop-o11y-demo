// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';

const users = new SharedArray('shop users', function() {
  return	[
		{"username": "${users[vu.idInTest -1].username}"},
		{"username": "Carlos"},
		{"username": "Raul"},
		{"username": "Abdelkrim"},
		{"username": "Willie"},
		{"username": "Aengus"},
		{"username": "Ward"},
		{"username": "Emil"},
		{"username": "Dave"},
		{"username": "Cyril"},
		{"username": "Devin"},
		{"username": "Mattias"},
		{"username": "Alain"},
		{"username": "Nabeel"},
		{"username": "Kris"},
		{"username": "Konrad"},
		{"username": "Federica"},
		{"username": "Simon"},
		{"username": "Andreas"},
		{"username": "Hans"}
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
      name: "Webshop Test ${users[vu.idInTest -1].username}"
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

  group(`page_1 - http://34.78.246.133:3389/shop?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://34.78.246.133:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.6)
  })

  group(`page_2 - http://34.78.246.133:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Meows&name=${users[vu.idInTest -1].username}`,
      {
        product: `Meows`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(1.6)
  })

  group(`page_3 - http://34.78.246.133:3389/shop?product=Carlos&name=Marcus`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Carlos&name=Marcus`,
      {
        product: `Carlos`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(1.5)
  })

  group(`page_4 - http://34.78.246.133:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: `Carla`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(2.3)
  })

  group(`page_5 - http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        `upgrade-insecure-requests`: `1`,
      },
    })
    sleep(3.4)

    response = http.post(
      `http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(3.1)
  })

  group(`page_6 - http://34.78.246.133:3389/shop?name=${users[vu.idInTest -1].username}#cats`, function () {
    response = http.get(`http://34.78.246.133:3389/shop?name=${users[vu.idInTest -1].username}`, {
      headers: {
        `upgrade-insecure-requests`: `1`,
      },
    })
    sleep(1.9)
  })

  group(`page_7 - http://34.78.246.133:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Loki&name=${users[vu.idInTest -1].username}`,
      {
        product: `Loki`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(0.8)
  })

  group(`page_8 - http://34.78.246.133:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Charlie&name=${users[vu.idInTest -1].username}`,
      {
        product: `Charlie`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(0.8)
  })

  group(`page_9 - http://34.78.246.133:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`, function () {
    response = http.post(
      `http://34.78.246.133:3389/shop?product=Carla&name=${users[vu.idInTest -1].username}`,
      {
        product: `Carla`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
    sleep(1.4)
  })

  group(`page_10 - http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}`, function () {
    response = http.get(`http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}`, {
      headers: {
        `upgrade-insecure-requests`: `1`,
      },
    })
    sleep(2.9)
  })

  group(`page_11 - http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`, function () {
    response = http.post(
      `http://34.78.246.133:3389/cart?name=${users[vu.idInTest -1].username}&checkout=true`,
      {
        name: `${users[vu.idInTest -1].username}`,
      },
      {
        headers: {
          `content-type`: `application/x-www-form-urlencoded`,
          origin: `http://34.78.246.133:3389`,
          `upgrade-insecure-requests`: `1`,
        },
      }
    )
  })
}

