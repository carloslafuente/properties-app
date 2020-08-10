const countryModel = require('../models/country.model');
const response = require('../shared/handlers/response.handler');

const getCountry = async (req, res) => {
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

module.exports = {
	getCountry,
};
