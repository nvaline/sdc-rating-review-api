const controller = require('./controllers');
const router = require('express').Router();

router.get('/reviews', controller.get.reviews);

router.get('/reviews/meta', controller.get.meta);

router.post('/reviews', controller.post.review);

router.put('/reviews/:review_id/helpful', controller.put.helpful);

router.put('/reviews/:review_id/report', controller.put.report);

module.exports = router;


