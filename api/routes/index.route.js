const express = require('express');
const app = express();
const user = require('./user.route');

app.use(user);

module.exports = app;
