const express = require('express');
const app = express();
const city = require('../controllers/city.controller');

app.get('/city', (req, res) => {
	city.getCities(req, res);
});

module.exports = app;
