require('dotenv').config();

const config = {
	port: process.env.PORT || 3000,
	uri: process.env.DB_URI || 'mongodb://localhost:27017/properties',
};
module.exports = config;
