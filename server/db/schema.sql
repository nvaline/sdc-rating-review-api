-- psql -U postgres < server/db/schema.sql

DROP DATABASE IF EXISTS pgone;

CREATE DATABASE pgone;

\c pgone;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT,
  summary VARCHAR ( 300 ),
  body VARCHAR ( 1000 ),
  recommend VARCHAR,
  reported BOOLEAN,
  reviewer_name VARCHAR ( 30 ),
  reviewer_email VARCHAR ( 75 ),
  response VARCHAR ( 500 ),
  helpfulness INT
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY NOT NULL,
  review_id INT REFERENCES reviews ( id ),
  url VARCHAR ( 250 ),
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT,
  name VARCHAR ( 30 )
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  characteristic_id INT REFERENCES characteristics ( id ),
  review_id INT REFERENCES reviews ( id ),
  value INT NOT NULL
);


-- \COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/home/ubuntu/csv/reviews.csv' DELIMITER ',' CSV HEADER;
--   CREATE INDEX product_idx ON reviews (product_id);
--   CREATE INDEX productReport_idx ON reviews (product_id, reported);
--   CREATE INDEX reported_idx ON reviews (reported);
--   CREATE INDEX date_idx ON reviews (date);
--   CREATE INDEX recommend_idx ON reviews (recommend);
--   CREATE INDEX reviewerName_idx ON reviews (reviewer_name);


-- \COPY photos(id, review_id, url) FROM '/home/ubuntu/csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;
--   CREATE INDEX review_idx ON photos (review_id);
--   CREATE INDEX url_idx ON photos (url);


-- \COPY characteristics(id, product_id, name) FROM '/home/ubuntu/csvcharacteristics.csv' DELIMITER ',' CSV HEADER;
--   CREATE INDEX product_index ON characteristics (product_id);
--   CREATE INDEX charName_indx ON characteristics (name);


-- \COPY characteristic_reviews(id, characteristic_id, review_id, value) FROM '/home/ubuntu/csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
--   CREATE INDEX char_idx ON characteristic_reviews (characteristic_id);
--   CREATE INDEX charVal_idx ON characteristic_reviews (value);
--   CREATE INDEX charReview_idx ON characteristic_reviews (review_id);



--------------------------------------
-- AWS DEPLOMENT
-- -----------------------------------

-- CREATE INDEX product_idx ON reviews (product_id);
-- CREATE INDEX productReport_idx ON reviews (product_id, reported);
-- CREATE INDEX reported_idx ON reviews (reported);
-- CREATE INDEX date_idx ON reviews (date);
-- CREATE INDEX recommend_idx ON reviews (recommend);
-- CREATE INDEX reviewerName_idx ON reviews (reviewer_name);

-- CREATE INDEX review_idx ON photos (review_id);
-- CREATE INDEX url_idx ON photos (url);

-- CREATE INDEX product_index ON characteristics (product_id);
-- CREATE INDEX charName_indx ON characteristics (name);

-- CREATE INDEX char_idx ON characteristic_reviews (characteristic_id);
-- CREATE INDEX charVal_idx ON characteristic_reviews (value);
-- CREATE INDEX charReview_idx ON characteristic_reviews (review_id);



-- pg_dump -h localhost -U postgres -C pgone | psql -h 3.16.114.121 -d sdc -U postgres

-- pg_dump -h 3.16.114.121 -U postgres -C sdc | psql -h localhost -d pgone postgres

-- scp -i ../../SDC.pem -r csv ubuntu@3.16.114.121:/home/ubuntu


-- app.get("/loaderio-15f8d28f9087e86de27c782b37f4912f", (req, res) => {
--   res.sendFile(path.join(__dirname, "../loaderio-15f8d28f9087e86de27c782b37f4912f.txt"));
-- });