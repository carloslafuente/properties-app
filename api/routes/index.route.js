const express = require('express');
const app = express();
const user = require('./user.route');
const login = require('./login.route');
const country = require('../routes/country.route');
const city = require('../routes/city.route');

app.use(user);
app.use(login);
app.use(country);
app.use(city);

module.exports = app;
