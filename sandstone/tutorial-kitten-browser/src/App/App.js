import kind from '@enact/core/kind';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Changeable from '@enact/ui/Changeable';
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

const _AppBase = kind({
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

	render: ({index, kitten, onNavigate, onSelectKitten, ...rest}) => (
		<div {...rest}>
			<Panels index={index} onBack={onNavigate}>
				<List onSelectKitten={onSelectKitten}>{kittens}</List>
				<Detail name={kittens[kitten]} />
			</Panels>
		</div>
	)
});

const AppBase = Changeable({prop: 'index', change: 'onNavigate'},
	Changeable({prop: 'kitten', change: 'onSelectKitten'},
		_AppBase
	)
);

const App = ThemeDecorator(AppBase);

export default App;
export {
	App,
	AppBase
};
