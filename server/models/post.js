const db = require('../db');

module.exports = {
  review: async ({ product_id, rating, summary, body, recommend, name, email, photos, characteristics }) => {
    try {
      const getReviewId = 'SELECT MAX( id ) FROM reviews;';
      let [{ max: review_id }] = await db.query(getReviewId);
      review_id++;

      //INSERT INTO REVIEWS TABLE/////////
      const reviewQuery =
        `INSERT INTO
          reviews
            (
              id,
              product_id,
              rating,
              date,
              summary,
              body,
              recommend,
              reviewer_name,
              reviewer_email,
              reported
            )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        db.none(reviewQuery, [review_id, product_id, rating, Date.now(), summary, body, recommend, name, email, false]);

      //INSERT INTO PHOTOS TABLE/////////
      const getPhotoId  = 'SELECT MAX( id ) FROM photos;';
      let [{ max: photo_id }] = await db.query(getPhotoId);
      photo_id++;

      for (photo of photos) {
        const photoQuery =
          `INSERT INTO
            photos
              (id, url, review_id)
            VALUES
              ($1, $2, $3)`;
        await db.none(photoQuery, [photo_id, photo, review_id]);
        photo_id++;
      }

      //INSERT INTO CHARACTERISTICS /////////
      const getCharsId  = 'SELECT MAX( id ) FROM characteristics;';
      let [{ max: chars_id }] = await db.query(getCharsId);
      console.log(chars_id)
      chars_id++;

      const charsQuery =
        `INSERT INTO
          characteristics ()
      `;

      //INSERT INTO CHARACTERISTIC_REVIEWS /////////
      const getCharsRvId  = 'SELECT MAX( id ) FROM characteristic_reviews;';
      let [{ max: charsRv_id }] = await db.query(getCharsRvId);
      console.log(charsRv_id)
      charsRv_id++;

      const charsRvQuery =
        `INSERT INTO
          characteristic_reviews ()
      `;

    }
    catch (err) { return err; }
  }
};