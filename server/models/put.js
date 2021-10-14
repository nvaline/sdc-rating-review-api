const db = require('../db');

module.exports = {
  helpfulness: async ({ review_id }) => {
    const query = `UPDATE
      reviews
        SET helpfulness = helpfulness + 1
        WHERE id = $1`;
    try {
      const results = await db.query(query, [review_id]);
      return;
    }
    catch (err) {
      return err;
    }
  },
  report: async ({ review_id }) => {
    const query = `UPDATE
    reviews
      SET reported = true
      WHERE id = $1`;
    try {
      const results = await db.query(query, [review_id]);
      return;
    }
    catch (err) {
      return err;
    }
  }
};