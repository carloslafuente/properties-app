const express = require('express');
const app = express();
const user = require('../controllers/user.controller');

app.post('/login', (req, res) => {
	user.loginUser(req, res);
});

module.exports = app;
