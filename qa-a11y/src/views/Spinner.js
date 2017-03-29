import Divider from '@enact/moonstone/Divider';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';

const SpinnerView = () => (
	<div>
		<Divider>Spinner with Text</Divider>
		<Spinner>Loading...</Spinner>
	</div>
);

export default SpinnerView;
