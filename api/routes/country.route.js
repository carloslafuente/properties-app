const express = require('express');
const app = express();
const country = require('../controllers/country.controller');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

app.get('/country', (req, res) => {
	country.getCountries(req, res);
});

app.get('/country/:id', (req, res) => {
	country.getCountryById(req, res);
});

app.post('/country', [verifyToken, verifyRole], (req, res) => {
	country.createCountry(req, res);
});

app.put('/country/:id', [verifyToken, verifyRole], (req, res) => {
	country.updateCountry(req, res);
});

app.delete('/country/:id', [verifyToken, verifyRole], (req, res) => {
	country.deleteCountry(req, res);
});

module.exports = app;
