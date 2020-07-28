const success = (code, method, path, result) => {
	return {
		code,
		message: `[Success] On ${method} ${path} operation`,
		result,
		error: null,
	};
};
const error = (code, method, path, error) => {
	return {
		code,
		message: `[Error] On ${method} ${path} operation`,
		result: null,
		error,
	};
};

module.exports = {
	success,
	error,
};
