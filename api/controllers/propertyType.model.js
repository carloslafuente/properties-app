const propertyTypeModel = require('../models/propertyType.model');
const response = require('../shared/handlers/response.handler');
const _ = require('underscore');

const getPropertyTypes = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await propertyTypeModel.find({});
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

const getPropertyTypeById = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await propertyTypeModel.findById(req.params.id);
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

const createPropertyType = async (req, res) => {
	let result;
	let error;
	let code;
	let propertyTypeName = req.body.name.toString().toLowerCase();
	let propertyType = new propertyTypeModel({
		name: propertyTypeName,
		description: req.body.description,
	});
	let propertyTypeExists = await verifyPropertyTypeName(propertyType.name);
	if (!propertyTypeExists) {
		try {
			result = await propertyType.save();
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
		error = { message: 'El tipo de propiedad que intentas agregar ya existe' };
		console.error(error);
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
};

const updateProperty = async (req, res) => {
	let result;
	let error;
	let code;
	let body = _.pick(req.body, ['name', 'description']);
	body.name = body.name.toString().toLowerCase();
	try {
		result = await propertyTypeModel.findByIdAndUpdate(req.params.id, body, {
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

const deleteProperty = async (req, res) => {
	let result;
	let error;
	let code;
	try {
		result = await propertyTypeModel.findOneAndRemove({ _id: req.params.id });
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

const verifyPropertyTypeName = async (propertyTypeName) => {
	let result;
	try {
		result = await propertyTypeModel.find({
			name: propertyTypeName.toLowerCase(),
		});
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
	getPropertyTypes,
	getPropertyTypeById,
	createPropertyType,
	updateProperty,
	deleteProperty,
};
