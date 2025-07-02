import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'Performance Test Company',
    type: 'EMPRESA_PYME',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('http://localhost:3000/companies', payload, params);
  
  check(res, {
    'status is 201': (r) => r.status === 201,
    'transaction time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}