import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import {routes} from  '../index';
import SampleItem from '../components/SampleItem';
import Scroller from '@enact/moonstone/Scroller';

import css from './App.less';

const App = kind({
	name: 'App',

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
									{path.substr(1)}
								</SampleItem>
							)
						}
						return null;
					})}
				</Scroller>
			</div>
		)
	}
});

export default MoonstoneDecorator(App);
