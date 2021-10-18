import kind from '@enact/core/kind';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {decreaseIndex, increaseIndex} from '../actions';
import MainPanel from '../views/MainPanel';

const Sample = kind({
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

const AppBase = connect(mapStateToProps, mapDispatchToProps)(Sample);
const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
