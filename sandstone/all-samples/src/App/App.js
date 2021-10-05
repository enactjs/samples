import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {routes} from  '../index';
import SampleItem from '../components/SampleItem';
import Scroller from '@enact/sandstone/Scroller';

import css from './App.module.less';

const forceFocusElement = () => {
	Spotlight.initialize();
};

const App = kind({
	name: 'App',

	propTypes: {
		history: PropTypes.object,
		location: PropTypes.any,
		match: PropTypes.any,
		staticContext: PropTypes.any
	},

	styles: {
		css,
		className: 'app'
	},

	render: ({history, ...props}) => {
		setTimeout(forceFocusElement, 100);

		delete props.match;
		delete props.location;
		delete props.staticContext;

		return (
			<div {...props}>
				<Scroller>
					{routes.map(({path}, index) => {
						if (path !== '/') {
							return (
								<SampleItem key={index} path={path} history={history}>
									{path.substr(1)}
								</SampleItem>
							);
						}
						return null;
					})}
				</Scroller>
			</div>
		);
	}
});

export default ThemeDecorator(App);
