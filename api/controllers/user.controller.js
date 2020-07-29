const userModel = require('../models/user.model');
const response = require('../shared/models/response.model');
const bcrypt = require('bcrypt');
const _ = require('underscore');

class User {
	constructor(req, res) {
		this.res = res;
		this.req = req;
	}

	getUsers = async () => {
		let result;
		let error;
		let code;
		try {
			result = await userModel.find(
				{},
				'name email role status google contact'
			);
		} catch (err) {
			console.error(err);
			error = err;
		}
		if (error) {
			code = 500;
			this.res
				.status(code)
				.json(response.error(code, this.req.method, this.req.path, error));
		} else {
			code = 200;
			this.res
				.status(code)
				.json(response.success(code, this.req.method, this.req.path, result));
		}
	};

	createUser = async () => {
		let body = this.req.body;
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
			this.res
				.status(code)
				.json(response.error(code, this.req.method, this.req.path, error));
		} else {
			code = 200;
			this.res
				.status(code)
				.json(response.success(code, this.req.method, this.req.path, result));
		}
	};

	updateUser = async () => {
		let id = this.req.params.id;
		let body = _.pick(this.req.body, [
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
			this.res
				.status(code)
				.json(response.error(code, this.req.method, this.req.path, error));
		} else {
			code = 200;
			this.res
				.status(code)
				.json(response.success(code, this.req.method, this.req.path, result));
		}
	};

	disableUser = async () => {
		let id = this.req.params.id;
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
			this.res
				.status(code)
				.json(response.error(code, this.req.method, this.req.path, error));
		} else {
			code = 200;
			this.res
				.status(code)
				.json(response.success(code, this.req.method, this.req.path, result));
		}
	};
}

module.exports = User;
