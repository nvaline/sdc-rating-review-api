const express = require('express');
const Router = express.Router();
const morgan = require('morgan');
require('newrelic');

//Connect to database
const db = require('./db');

//connection to Router
const router = require('./routes.js');

const app = express();
const PORT = process.env.PORT || 3113;

//diagnostic middleware
app.use(morgan('dev'));
app.use(express.json());

//point server to all routes
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));

