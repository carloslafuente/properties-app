const express = require('express');
const app = express();
const city = require('../controllers/city.controller');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

app.get('/city', (req, res) => {
	city.getCities(req, res);
});

app.post('/city', [verifyToken, verifyRole], (req, res) => {
	city.createCity(req, res);
});

app.put('/city/:id', [verifyToken, verifyRole], (req, res) => {
	city.updateCity(req, res);
});

app.delete('/city/:id', [verifyToken, verifyRole], (req, res) => {
	city.deleteCity(req, res);
});

module.exports = app;
