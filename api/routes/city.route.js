const express = require('express');
const app = express();
const city = require('../controllers/city.controller');

app.get('/city', (req, res) => {
	city.getCities(req, res);
});

app.post('/city', (req, res) => {
	city.createCity(req, res);
});

app.put('/city/:id', (req, res) => {
	city.updateCity(req, res);
});

module.exports = app;
