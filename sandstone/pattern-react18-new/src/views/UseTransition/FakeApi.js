const createDelay = () => {
	return new Promise((resolve) => {
		const delay = Math.random() * 500 + 200;
		setTimeout(() => resolve(delay), delay);
	});
};

const wrapPromise = (promise) => {
	let status = 'pending';
	let result;
	let suspender = promise.then(
		(r) => {
			status = 'success';
			result = r;
		},
		(e) => {
			status = 'error';
			result = e;
		}
	);
	return {
		read () {
			if (status === 'pending') {
				throw suspender;
			} else if (status === 'error') {
				throw result;
			} else if (status === 'success') {
				return result;
			}
		}
	};
};

export const fetchData  = () => {
	return createDelay();
};

export const fetchDataUseTransition = () => {
	let promise = createDelay();
	return {
		delay: wrapPromise(promise)
	};
};
