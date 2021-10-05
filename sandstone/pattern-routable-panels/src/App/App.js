import kind from '@enact/core/kind';
import {Panels, Routable, Route} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';

import AboutPanel from '../views/AboutPanel';
import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const forceFocusElement = () => {
	if (!Spotlight.getCurrent()) {
		Spotlight.focus();
		Spotlight.initialize();
	}
};

const App = kind({
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
		// In order not to lose focus on the sample when navigating to the sample through all-samples, for now we manually focus the element
		setTimeout(forceFocusElement, 100);
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

export default ThemeDecorator(
	AppStateDecorator(
		App
	)
);
