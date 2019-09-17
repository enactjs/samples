import React from 'react';
//enact import
import kind from '@enact/core/kind';
//enact Moonstone import
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import BodyText from '@enact/moonstone/BodyText';
//Custom component
import Counter from '../components/Counter';

//css
import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<BodyText skin="light" centered>Hello Enact + TypeScript!</BodyText>
			<Counter />
		</div>
	)
});

export default MoonstoneDecorator(App);
