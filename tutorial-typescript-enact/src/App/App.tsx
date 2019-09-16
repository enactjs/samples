import React from 'react';
//enact import
import kind from '@enact/core/kind';
import Panels from '@enact/moonstone/Panels';
//enact Moonstone import
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import BodyText from '@enact/moonstone/BodyText';
import Skinnable from '@enact/moonstone/Skinnable';
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
			<div className={props.className}>
			<BodyText skin="light" centered>Hello Enact + TypeScript!</BodyText>
				<Counter />
			</div>
		</div>
	)
});

export default MoonstoneDecorator(App);
