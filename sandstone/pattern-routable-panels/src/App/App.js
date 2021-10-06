import kind from '@enact/core/kind';
import {Panels, Routable, Route} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';

import AboutPanel from '../views/AboutPanel';
import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const _AppBase = kind({
	name: 'App',

	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.string
	},

	handlers: {
		onFirstPanel: (ev, {onNavigate}) => onNavigate({path: '/first'}),
		onSecondPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second'}),
		onThirdPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third'}),
		onFourthPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third/fourth'})
	},

	render: ({onFirstPanel, onFourthPanel, onNavigate, onSecondPanel, onThirdPanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				<Route component={AboutPanel} onClick={onSecondPanel} path="first" title="About Routable Panels Pattern">
					<Route component={MainPanel} next="fourth" onClick={onFourthPanel} path="second" title="Second" />
					<Route component={MainPanel} next="first" onClick={onFirstPanel} path="third" title="Third">
						<Route component={MainPanel} next="third" onClick={onThirdPanel} path="fourth" title="Fourth" />
					</Route>
				</Route>
			</RoutablePanels>
		);
	}
});

const AppBase = AppStateDecorator(_AppBase);
const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
