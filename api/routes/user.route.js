const express = require('express');
const app = express();
const user = require('../controllers/user.controller');
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware');

app.get('/user', verifyToken, (req, res) => {
	user.getUsers(req, res);
});

app.post('/user', [verifyToken, verifyRole], (req, res) => {
	user.createUser(req, res);
});

app.put('/user/:id', verifyToken, (req, res) => {
	user.updateUser(req, res);
});

app.delete('/user/:id', [verifyToken, verifyRole], (req, res) => {
	user.disableUser(req, res);
});

module.exports = app;
