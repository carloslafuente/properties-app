const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let countrySchema = new Schema({
	name: {
		type: String,
		required: [true, 'El nombre es necesario'],
	},
});

module.exports = mongoose.model('country', countrySchema, 'countries');
