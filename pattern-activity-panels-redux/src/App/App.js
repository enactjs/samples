import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import Button, {CustomButton} from '../components/MyButt';

const App = kind({
	name: 'App',

	render: ({...rest}) => {
		return (
			<div {...rest}>
				<Button>Uncustom button</Button>
				<CustomButton>custom button</CustomButton>
			</div>
		);
	}
});

export default MoonstoneDecorator(App);
