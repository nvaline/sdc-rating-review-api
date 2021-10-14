const { put } = require('../models');

module.exports = {
  helpful: (req, res) => {
    put.helpfulness(req.params)
      .then(data => res.status(200).end())
      .catch(err => res.sendStatus(400).send(err))
  },
  report: (req, res) => {
    put.report(req.params)
    .then(data => res.status(200).end())
    .catch(err => res.sendStatus(400).send(err))
  }
};