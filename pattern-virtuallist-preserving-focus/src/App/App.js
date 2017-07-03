import {ActivityPanels} from '@enact/moonstone/Panels';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import PropTypes from 'prop-types';

import {increaseIndex, decreaseIndex} from '../actions';
import MainPanel from '../views/MainPanel';

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
		return (
			<ActivityPanels {...rest} onSelectBreadcrumb={popPanel} index={index}>
				<MainPanel title="First" onClick={pushPanel} />
				<MainPanel title="Second" onClick={pushPanel} />
				<MainPanel title="Third" onClick={pushPanel} />
				<MainPanel title="Fourth" />
			</ActivityPanels>
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

export default MoonstoneDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
