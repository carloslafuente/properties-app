const express = require('express');
const app = express();
const user = require('../controllers/user.controller');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

app.get('/user', verifyToken, (req, res) => {
	user.getUsers(req, res);
});

app.post('/user', (req, res) => {
	user.createUser(req, res);
});

app.put('/user/:id', (req, res) => {
	user.updateUser(req, res);
});

app.delete('/user/:id', (req, res) => {
	user.disableUser(req, res);
});

module.exports = app;
