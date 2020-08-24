const express = require('express');
const app = express();
const propertyType = require('../controllers/propertyType.model');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

app.get('/propertyType', (req, res) => {
	propertyType.getPropertyTypes(req, res);
});

app.get('/propertyType/:id', (req, res) => {
	propertyType.getPropertyTypeById(req, res);
});

app.post('/propertyType', [verifyToken, verifyRole], (req, res) => {
	propertyType.createPropertyType(req, res);
});

app.put('/propertyType/:id', [verifyToken, verifyRole], (req, res) => {
	propertyType.updateProperty(req, res);
});

app.delete('/propertyType/:id', [verifyToken, verifyRole], (req, res) => {
	propertyType.deleteProperty(req, res);
});

module.exports = app;
