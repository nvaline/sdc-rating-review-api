const http = require('k6/http');
const { sleep } = require('k6');

export let options = {
  vus: 600,
  duration: '1m'
  // stages: [
  //   { duration: '10s', target: 1000 },
  //   { duration: '10s', target: 2500 },
  //   { duration: '30s', target: 3500 },
  //   { duration: '30s', target: 4500 }
  // ]
};

// export default function () {
//   http.get(`http://localhost:3113/api/reviews?product_id=${Math.floor(Math.random() * 5000000)}`);
//   sleep(1);
// }
export default function () {
  http.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${Math.floor(Math.random() * 2000)}`, { headers: {'Authorization': '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'} });
  sleep(1);
}

// export default function () {
//   http.get(`http://localhost:3113/api/reviews/meta?review_id=${Math.floor(Math.random() * 50000)}`);
//   sleep(1);
// }