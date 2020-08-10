const express = require('express');
const app = express();
const country = require('../controllers/country.controller');

app.get('/country', (req, res) => {
	country.getCountry(req, res);
});

module.exports = app;
