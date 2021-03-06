const cityModel = require('../models/city.model');
const response = require('../shared/handlers/response.handler');
const _ = require('underscore');

const getCities = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await cityModel.find({}).populate('country').exec();
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

const getCityById = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await cityModel.findById(req.params.id).populate('country').exec();
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

const createCity = async (req, res) => {
	let result;
	let error;
	let code;
	let newCity = new cityModel({
		name: req.body.name.toLowerCase(),
		country: req.body.country,
	});
	let cityExists = await verifyCityName(newCity);
	if (!cityExists) {
		try {
			result = await newCity.save();
		} catch (err) {
			console.error(err);
			error = err;
		}
		if (error) {
			code = 500;
			res.status(code).json(response.error(code, req.method, req.path, error));
		} else {
			code = 200;
			res
				.status(code)
				.json(response.success(code, req.method, req.path, result));
		}
	} else {
		code = 500;
		error = { message: 'La ciudad que intentas agregar ya existe' };
		console.error(error);
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
};

const updateCity = async (req, res) => {
	let result;
	let error;
	let code;
	let body = _.pick(req.body, ['name', 'country']);
	body.name ? (body.name = body.name.toString().toLowerCase()) : '';
	try {
		result = await cityModel.findByIdAndUpdate(req.params.id, body, {
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

const deleteCity = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await cityModel.findOneAndRemove({ _id: req.params.id });
	} catch (err) {
		error = err;
		console.error(error);
	}
	if (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	} else {
		code = 200;
		res.status(code).json(response.success(code, req.method, req.path, result));
	}
};

const verifyCityName = async (city) => {
	let result;
	try {
		result = await cityModel.find({
			name: city.name,
			country: city.country,
		});
	} catch (err) {
		console.error(err);
		return true;
	}
	if (result.length == 0) {
		return false;
	} else {
		return true;
	}
};

module.exports = {
	getCities,
	getCityById,
	createCity,
	updateCity,
	deleteCity,
};
