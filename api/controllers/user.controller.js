const userModel = require('../models/user.model');
const response = require('../shared/models/response.model');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await userModel.find({}, 'name email role status google contact');
	} catch (err) {
		console.error(err);
		error = err;
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	} else {
		code = 200;
		res.status(code).json(response.success(code, req.method, req.path, result));
	}
};

const createUser = async (req, res) => {
	let body = req.body;
	let result;
	let error;
	let code;
	let user;
	try {
		if (body.password) {
			user = new userModel({
				name: body.name,
				email: body.email,
				password: bcrypt.hashSync(body.password, 10),
				role: body.role,
				contact: body.contact,
			});
			result = await user.save();
		} else {
			throw new Error('Password is required');
		}
	} catch (err) {
		console.error(err);
		error = err;
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	} else {
		code = 200;
		res.status(code).json(response.success(code, req.method, req.path, result));
	}
};

const updateUser = async (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, [
		'name',
		'email',
		'image',
		'role',
		'status',
		'contact',
	]);
	let result;
	let error;
	let code;
	try {
		result = await userModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});
	} catch (err) {
		console.error(err);
		error = err;
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	} else {
		code = 200;
		res.status(code).json(response.success(code, req.method, req.path, result));
	}
};

const disableUser = async (req, res) => {
	let id = req.params.id;
	let body = {
		status: false,
	};
	let result;
	let error;
	let code;
	try {
		result = await userModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});
	} catch (err) {
		console.error(err);
		error = err;
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	} else {
		code = 200;
		res.status(code).json(response.success(code, req.method, req.path, result));
	}
};

const loginUser = async (req, res) => {
	let body = req.body;
	let result;
	let error;
	let code;
	try {
		result = await userModel.findOne({ email: body.email });
	} catch (err) {
		console.log(err);
		error = err;
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	}

	if (result === null) {
		code = 400;
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
	if (!bcrypt.compareSync(body.password, result.password)) {
		code = 400;
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
	const token = jwt.sign({ user: result }, process.env.JWT_SECRET.toString(), {
		expiresIn: process.env.EXPIRATION_VALUE,
	});
	if (token) {
		code = 200;
		res
			.status(code)
			.json(response.success(code, req.method, req.path, result, token));
	}
};

module.exports = {
	getUsers,
	createUser,
	updateUser,
	disableUser,
	loginUser,
};
