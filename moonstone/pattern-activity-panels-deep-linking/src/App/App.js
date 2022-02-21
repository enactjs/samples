import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels, Routable, Route} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';

import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onSelectBreadcrumb'}, ActivityPanels);

const Sample = kind({
	name: 'App',

	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.string
	},

	handlers: {
		onSecondPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second'}),
		onThirdPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second/third'}),
		onFourthPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second/third/fourth'})
	},

	render: ({onFourthPanel, onNavigate, onSecondPanel, onThirdPanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
				<Route component={MainPanel} onClick={onSecondPanel} path="first" title="First">
					<Route component={MainPanel} onClick={onThirdPanel} path="second" title="Second">
						<Route component={MainPanel} onClick={onFourthPanel} path="third" title="Third">
							<Route component={MainPanel} path="fourth" title="Fourth" />
						</Route>
					</Route>
				</Route>
			</RoutablePanels>
		);
	}
});

const AppBase = AppStateDecorator(Sample);
const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
