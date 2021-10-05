import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';

import FileBrowser from '../components/FileBrowser';

import css from './App.module.less';

// This would be replaced by redux but Changeable is a handy single-value, single-event state HOC
const Browser = Changeable(
	{prop: 'path', change: 'onNavigate'},
	FileBrowser
);

const forceFocusElement = () => {
	if (!Spotlight.getCurrent()) {
		Spotlight.focus();
		Spotlight.initialize();
	}
};

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		// In order not to lose focus on the sample when navigating to the sample through all-samples, for now we manually focus the element
		setTimeout(forceFocusElement, 100);
		return (
			<div {...props}>
				<Browser defaultPath={{path: '/a', directory: true}} />
			</div>
		);
	}
});

export default ThemeDecorator(App);
