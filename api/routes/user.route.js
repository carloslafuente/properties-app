const express = require('express');
const app = express();
const User = require('../controllers/user.controller');

app.get('/user', async (req, res) => {
	const user = new User(req, res);
	user.getUsers();
});

app.post('/user', async (req, res) => {
	const user = new User(req, res);
	user.createUser();
});

app.put('/user/:id', async (req, res) => {
	const user = new User(req, res);
	user.updateUser();
});

module.exports = app;
