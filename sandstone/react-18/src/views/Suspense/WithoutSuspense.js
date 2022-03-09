import kind from '@enact/core/kind';
import React from 'react';

// Load the "SamplePage" component after 3s
const SamplePage = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(import('./SamplePage'));
		}, 3000);
	});
});

const WithoutSuspense = kind({
	name: 'WithoutSuspense',

	render: () => (
		<SamplePage />
	)
});

export default WithoutSuspense;
