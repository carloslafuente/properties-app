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

const verifyRole = (req, res, next) => {
	let user = req.user;
	if (user.role !== 'ADMIN_ROLE') {
		return res.status(401).json({
			ok: false,
			error: {
				message: `No tienes autorizacion para realizar esta operacion`,
			},
		});
	}
	next();
};

const verifyImageToken = (req, res, next) => {
	let token = req.query.token;
	jwt.verify(token, process.env.JWT_SECRET.toString(), (error, decoded) => {
		if (error) {
			return res.status(401).json({
				ok: false,
				error,
			});
		}
		req.user = decoded.user;
		next();
	});
};

module.exports = { verifyToken, verifyRole, verifyImageToken };
