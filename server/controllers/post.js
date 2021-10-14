const { post } = require('../models');

module.exports = {
  review: (req, res) => {
    post.review(req.body)
    .then(data => res.status(200).end())
    .catch(err => res.sendStatus(400).send(err))
  }
};