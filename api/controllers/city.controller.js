const cityModel = require('../models/city.model');
const response = require('../shared/handlers/response.handler');

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

module.exports = {
	getCities,
};
