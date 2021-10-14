const { get } = require('../models');

module.exports = {
  reviews: (req, res) => {
    get.reviews(req.query)
      .then(data => res.status(200).json(data))
      .catch(err => res.sendStatus(400).send(err))
  },
  meta: (req, res) => {
    get.meta(req.query)
      .then(data => res.status(200).json(data))
      .catch(err => res.sendStatus(400))
  }
};