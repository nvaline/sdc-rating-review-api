const http = require('k6/http');
const { sleep } = require('k6');

export let options = {
  // vus: 8000,
  // duration: '5m',
  stages: [
    { duration: '10s', target: 1000 },
    { duration: '10s', target: 2500 },
    { duration: '30s', target: 3500 },
    { duration: '30s', target: 4500 }
  ]
};

export default function () {
  http.get(`http://localhost:3113/api/reviews/meta?review_id=${Math.floor(Math.random() * 5000000)}`);
  sleep(1);
}
