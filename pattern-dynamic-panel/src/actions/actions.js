const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		payload: {
			path: path
		}
	};
};

export {
	navigate
};
