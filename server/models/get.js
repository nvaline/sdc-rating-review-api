const db = require('../db');

module.exports = {
  reviews: async ({ product_id, count = 100, page = 1, sort = 'newest'}) => {
    const query =
      `SELECT
        reviews.id AS review_id,
        reviews.rating,
        to_timestamp(reviews.date/1000) AS date,
        reviews.summary,
        reviews.body,
        reviews.recommend,
        reviews.reviewer_name,
        reviews.response,
        reviews.reported,
        reviews.helpfulness,
          json_agg(json_build_object('id', photos.id, 'url', photos.url)) AS photos
        FROM reviews
          LEFT JOIN photos
        ON photos.review_id = reviews.id
        WHERE reviews.product_id = $1 AND reviews.reported = false
        GROUP BY reviews.id
        LIMIT $2;`;
    try {
      const results = await db.query(query, [product_id, count])
      return {
        count,
        page,
        product_id,
        results
      };
    }
    catch (err) {
      return err;
    }
  },
  meta: async ({ product_id }) => {
    const getMeta =`
    SELECT
      characteristics.product_id,
      characteristics.name,
      characteristic_reviews.value,
      characteristic_reviews.id,
      reviews.rating,
      reviews.recommend,
      characteristic_reviews.value
    FROM characteristics
    INNER JOIN characteristic_reviews ON characteristics.id = characteristic_reviews.characteristic_id
    INNER JOIN reviews ON reviews.id = characteristic_reviews.review_id
    WHERE reviews.product_id = $1
    GROUP BY
      characteristics.product_id,
      characteristics.name,
      characteristic_reviews.value,
      characteristic_reviews.id,
      reviews.rating,
      reviews.recommend;`;
    try{
      const reviews_meta = await db.query(getMeta, [product_id]);
      const api_meta = reviews_meta.reduce((obj, meta) => {

        const { product_id, name, value, id, rating, recommend } = meta;

        obj['product_id'] = `${product_id}`;
        obj['ratings'] = {...obj['ratings'], [rating]:0};
        obj['recommended'] = {...obj['recommended'], [recommend ? Number(0) : Number(1)] : value};
        obj['characteristics'] =
          reviews_meta.reduce((obj2, {id, value, name}) => {
            obj2[name] = {id, value};
            return obj2
          }, {});
          return obj;
      },{});

      return api_meta;
    }
    catch(err) { console.log('ERROR: ', err) }

  }
}




// meta: async ({ product_id }) => {
//   const getMeta =`
//   SELECT
//     characteristics.product_id,
//     characteristics.name,
//     characteristic_reviews.value,
//     characteristic_reviews.id,
//     reviews.rating,
//     reviews.recommend,
//     characteristic_reviews.value
//   FROM characteristics
//   INNER JOIN characteristic_reviews ON characteristics.id = characteristic_reviews.characteristic_id
//   INNER JOIN reviews ON reviews.id = characteristic_reviews.review_id
//   WHERE reviews.product_id = $1
//   GROUP BY
//     characteristics.product_id,
//     characteristics.name,
//     characteristic_reviews.value,
//     characteristic_reviews.id,
//     reviews.rating,
//     reviews.recommend;`;
//   try{
//     const reviews_meta = await db.query(getMeta, [product_id]);
//     const api_meta = reviews_meta.reduce((obj, meta) => {

//       const { product_id, name, value, id, rating, recommend } = meta;

//       obj['product_id'] = `${product_id}`;
//       obj['ratings'] = {...obj['ratings'], [rating]:0};
//       obj['recommended'] = {...obj['recommended'], [recommend ? Number(0) : Number(1)] : value};
//       obj['characteristics'] =
//         reviews_meta.reduce((obj2, {id, value, name}) => {
//           obj2[name] = {id, value};
//           return obj2
//         }, {});
//         return obj;
//     },{});

//     return api_meta;
//   }
//   catch(err) { console.log('ERROR: ', err) }

// }