import kind from '@enact/core/kind';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import {connect} from 'react-redux';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

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
				<Panels>
					<MainPanel />
				</Panels>
			</div>
		);
	}
});

const mapStateToProps = ({locale}) => ({locale});

export default connect(mapStateToProps, {})(ThemeDecorator(App));
