import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import Button, {CustomButton} from '../components/MyButt';
import BodyText from '@enact/moonstone/BodyText';
import Divider from '@enact/moonstone/Divider';
import Image from '@enact/moonstone/Image';

const App = kind({
	name: 'App',

	render: ({...rest}) => {
		return (
			<div {...rest}>
				<Button casing="word">Uncustom button</Button>
				<CustomButton casing="word">custom button</CustomButton>
				<Button small color="green" casing="word">Uncustom button</Button>
				<CustomButton small color="red" casing="word">custom button</CustomButton>
				<BodyText>moonstone BodyText</BodyText>
				<Divider>moonstone Divider</Divider>
				<Image src="http://lorempixel.com/256/256/" sizing="fit" />
			</div>
		);
	}
});

export default MoonstoneDecorator(App);
