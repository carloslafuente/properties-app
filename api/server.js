const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index.route');
const { port, uri } = require('./env.config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(routes);

const connect = async () => {
	let con;
	try {
		con = await mongoose.connect(uri);
	} catch (err) {
		console.error(err);
	}
	if (con) {
		console.log(`[Database] Mongo database connected successfully`);
	}
};

const init = async () => {
	let result;
	try {
		result = await app.listen(port);
	} catch (err) {
		console.error(err);
	}
	if (result) {
		connect();
		console.log(`[Server] Server is running on port: ${port}`);
	}
};

init();
