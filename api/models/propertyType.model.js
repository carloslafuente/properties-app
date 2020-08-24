const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let propertyTypeSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'El nombre es necesario'],
	},
	description: {
		type: String,
		required: [false],
	},
});

module.exports = mongoose.model('propertyType', propertyTypeSchema, 'propertyTypes');
