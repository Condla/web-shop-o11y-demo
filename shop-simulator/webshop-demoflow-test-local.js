// Scenario: Scenario_1 (executor: ramping-vus)

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      projectID: 3569409,
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 20 },
        'amazon:fr:paris': { loadZone: 'amazon:fr:paris', percent: 80 },
      },
      apm: [],
      name: "Webshop Test Stefan"
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '10s' },
        { target: 20, duration: '20s' },
        { target: 0, duration: '10s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_1 - http://34.78.246.133:3389/shop?name=Stefan', function () {
    response = http.get('http://34.78.246.133:3389/shop?name=Stefan', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.6)
  })

  group('page_2 - http://34.78.246.133:3389/shop?product=Meows&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Meows&name=Stefan',
      {
        product: 'Meows',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.6)
  })

  group('page_3 - http://34.78.246.133:3389/shop?product=Charlie&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Charlie&name=Stefan',
      {
        product: 'Charlie',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.5)
  })

  group('page_4 - http://34.78.246.133:3389/shop?product=Carla&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Carla&name=Stefan',
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2.3)
  })

  group('page_5 - http://34.78.246.133:3389/cart?name=Stefan', function () {
    response = http.get('http://34.78.246.133:3389/cart?name=Stefan', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(3.4)

    response = http.post(
      'http://34.78.246.133:3389/cart?name=Stefan',
      {
        name: 'Stefan',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(3.1)
  })

  group('page_6 - http://34.78.246.133:3389/shop?name=Stefan#cats', function () {
    response = http.get('http://34.78.246.133:3389/shop?name=Stefan', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(1.9)
  })

  group('page_7 - http://34.78.246.133:3389/shop?product=Loki&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Loki&name=Stefan',
      {
        product: 'Loki',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group('page_8 - http://34.78.246.133:3389/shop?product=Charlie&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Charlie&name=Stefan',
      {
        product: 'Charlie',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(0.8)
  })

  group('page_9 - http://34.78.246.133:3389/shop?product=Carla&name=Stefan', function () {
    response = http.post(
      'http://34.78.246.133:3389/shop?product=Carla&name=Stefan',
      {
        product: 'Carla',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(1.4)
  })

  group('page_10 - http://34.78.246.133:3389/cart?name=Stefan', function () {
    response = http.get('http://34.78.246.133:3389/cart?name=Stefan', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.9)
  })

  group('page_11 - http://34.78.246.133:3389/cart?name=Stefan&checkout=true', function () {
    response = http.post(
      'http://34.78.246.133:3389/cart?name=Stefan&checkout=true',
      {
        name: 'Stefan',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://34.78.246.133:3389',
          'upgrade-insecure-requests': '1',
        },
      }
    )
  })
}

