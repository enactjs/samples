import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import Changeable from '@enact/ui/Changeable';
import React from 'react';
import PropTypes from 'prop-types';

import Detail from '../views/Detail';
import List from '../views/List';

const kittens = [
	'Garfield',
	'Nermal',
	'Simba',
	'Nala',
	'Tiger',
	'Kitty'
];

const AppBase = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		kitten: PropTypes.number,
		onNavigate: PropTypes.func,
		onSelectKitten: PropTypes.func
	},

	defaultProps: {
		index: 0,
		kitten: 0
	},

	handlers: {
		onSelectKitten: (ev, {onNavigate, onSelectKitten}) => {
			if (onSelectKitten) {
				onSelectKitten({
					kitten: ev.index
				});
			}

			// navigate to the detail panel on selection
			if (onNavigate) {
				onNavigate({
					index: 1
				});
			}
		}
	},

	render: ({index, onNavigate, onSelectKitten, kitten, ...rest}) => (
		<div {...rest}>
			<ActivityPanels index={index} onSelectBreadcrumb={onNavigate}>
				<List onSelectKitten={onSelectKitten}>{kittens}</List>
				<Detail name={kittens[kitten]} />
			</ActivityPanels>
		</div>
	)
});

const App = Changeable({prop: 'index', change: 'onNavigate'},
	Changeable({prop: 'kitten', change: 'onSelectKitten'},
		MoonstoneDecorator(AppBase)
	)
);

export default App;
export {App, AppBase};
