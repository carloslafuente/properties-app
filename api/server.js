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

mongoose
	.connect(uri)
	.then(() => {
		console.log(`[Database] Mongo database connected successfully`);
	})
	.catch((err) => {
		console.error(err);
	});

app.listen(port, () => {
	console.log(`[Server] Server is running on port: ${port}`);
});
