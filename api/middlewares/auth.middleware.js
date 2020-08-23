const jwt = require('jsonwebtoken');
const response = require('../shared/handlers/response.handler');

const verifyToken = async (req, res, next) => {
	let token = req.get('Authorization');
	let code;
	let result;
	try {
		result = await jwt.verify(token, process.env.JWT_SECRET.toString());
		req.user = result.user;
		next();
	} catch (error) {
		code = 500;
		res.status(code).json(response.error(code, req.method, req.path, error));
	}
};

const verifyRole = async (req, res, next) => {
	let user = req.user;
	let code;
	let error;
	if (user.role !== 'ADMIN_ROLE') {
		error = `No tienes autorizacion para realizar esta operacion`;
		code = 401;
		return res
			.status(code)
			.json(response.error(code, req.method, req.path, error));
	}
	next();
};

module.exports = { verifyToken, verifyRole };
