const express = require('express');
const app = express();
const user = require('./user.route');
const login = require('./login.route');

app.use(user);
app.use(login);

module.exports = app;
