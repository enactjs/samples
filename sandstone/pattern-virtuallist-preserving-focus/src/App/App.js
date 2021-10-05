import kind from '@enact/core/kind';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {decreaseIndex, increaseIndex} from '../actions';
import MainPanel from '../views/MainPanel';

const forceFocusElement = () => {
	if (!Spotlight.getCurrent()) {
		Spotlight.focus();
		Spotlight.initialize();
	}
};

const App = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		popPanel: PropTypes.func,
		pushPanel: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	render: ({index, pushPanel, popPanel, ...rest}) => {
		// In order not to lose focus on the sample when navigating to the sample through all-samples, for now we manually focus the element
		setTimeout(forceFocusElement, 100);
		return (
			<Panels {...rest} index={index} onBack={popPanel}>
				<MainPanel onClick={pushPanel} title="First" />
				<MainPanel onClick={pushPanel} title="Second" />
				<MainPanel onClick={pushPanel} title="Third" />
				<MainPanel title="Fourth" />
			</Panels>
		);
	}
});

const mapStateToProps = ({index}) => ({
	index
});

const mapDispatchToProps = (dispatch) => {
	return {
		pushPanel: () => dispatch(increaseIndex()),
		popPanel: () => dispatch(decreaseIndex())
	};
};

export default ThemeDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
