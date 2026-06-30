import kind from '@enact/core/kind';
import SpotlightRootDecorator from '@enact/spotlight/SpotlightRootDecorator';
import {HashRouter, Route, Routes} from 'react-router';

import {sampleRoutes} from '../routes';
import MainView from '../views/MainView';
import SamplePage from '../views/SamplePage';

import css from './App.module.less';

const AppBase = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<HashRouter>
				<Routes>
					<Route path="/" element={<MainView />} />
					{sampleRoutes.map(({path, title, Component}) => (
						<Route
							key={path}
							path={path}
							element={(
								<SamplePage title={title}>
									<Component />
								</SamplePage>
							)}
						/>
					))}
				</Routes>
			</HashRouter>
		</div>
	)
});

export default SpotlightRootDecorator(AppBase);
