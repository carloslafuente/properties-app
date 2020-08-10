const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
	name: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
	},
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'country',
	},
});

module.exports = mongoose.model('city', citySchema, 'cities');
