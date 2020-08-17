const countryModel = require('../models/country.model');
const response = require('../shared/handlers/response.handler');

const getCountries = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await countryModel.find({});
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

const createCountry = async (req, res) => {
	let result;
	let error;
	let code;
	let countryName = req.body.name.toString().toLowerCase();
	let country = new countryModel({
		name: countryName,
	});
	let countryExists = await verifyCountryName(country.name);
	if (!countryExists) {
		try {
			result = await country.save();
		} catch (err) {
			console.log(err);
			error = err;
		}
		if (error) {
			code = 500;
			console.error(error);
			res.status(code).json(response.error(code, req.method, req.path, error));
		} else {
			code = 200;
			res
				.status(code)
				.json(response.success(code, req.method, req.path, result));
		}
	} else {
		code = 500;
		error = 'El pais que intentas agregar ya existe';
		console.error(error);
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
};

const updateCountry = async (req, res) => {
	let result;
	let error;
	let code;
	let countryName = req.body.name.toString().toLowerCase();
	let newCountry = { name: countryName };
	try {
		result = await countryModel.findByIdAndUpdate(req.params.id, newCountry, {
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

const deleteCountry = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await countryModel.findOneAndRemove({ _id: req.params.id });
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

const verifyCountryName = async (countryName) => {
	let result;
	try {
		result = await countryModel.find({ name: countryName.toLowerCase() });
	} catch (err) {
		console.error(err);
	}
	if (result.length == 0) {
		return false;
	} else {
		return true;
	}
};

module.exports = {
	getCountries,
	createCountry,
	updateCountry,
	deleteCountry,
};
