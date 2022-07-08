import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {routes} from  '../index';
import SampleItem from '../components/SampleItem';
import Scroller from '@enact/ui/Scroller';

import css from './App.module.less';

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
									{path.substring(1)}
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

export default App;
