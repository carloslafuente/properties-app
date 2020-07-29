const codes = [
	{
		code: 200,
		message: 'OK',
	},
	{
		code: 400,
		message: 'Bad Request',
	},
	{
		code: 404,
		message: 'Not Found',
	},
	{
		code: 500,
		message: 'Internal Server Error',
	},
];
const success = (code, method, path, result) => {
	return {
		code,
		message: `[Success]: On ${method} ${path} operation`,
		result,
		error: null,
	};
};
const error = (code, method, path, error) => {
	m = codes.filter((c) => {
		return c.code == code;
	})[0];
	return {
		code,
		message: `[Error]: On ${method} ${path} operation`,
		result: null,
		error: `[${m.message}]: ${error.message}`,
	};
};

module.exports = {
	success,
	error,
};
