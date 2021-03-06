const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
	values: ['USER_ROLE', 'ADMIN_ROLE'],
	message: '{VALUE} no es un rol valido',
};

let userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'El nombre es necesario'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario'],
	},
	password: {
		type: String,
		required: [true, 'La contraseña es necesaria'],
	},
	image: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: validRoles,
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
	contact: {
		type: String,
		required: true,
	},
});

userSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('user', userSchema, 'users');
