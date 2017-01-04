import React from 'react';
import kind from '@enact/core/kind';
import {connect} from 'react-redux';
import {ActivityPanels} from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import MainPanel from '../views/MainPanel';
import {increaseIndex, decreaseIndex} from '../actions';

const App = kind({
	propTypes: {
		index: React.PropTypes.number,
		popPanel: React.PropTypes.func,
		pushPanel: React.PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	render: ({index, pushPanel, popPanel, ...rest}) => {
		return (
			<ActivityPanels {...rest} onSelectBreadcrumb={popPanel} index={index}>
				<MainPanel title="First" onClick={pushPanel}/>
				<MainPanel title="Second" onClick={pushPanel}/>
				<MainPanel title="Third" onClick={pushPanel}/>
				<MainPanel title="Fourth" />
			</ActivityPanels>
		)
	}
})

const mapStateToProps = ({index}) => ({
	index
});

const mapDispatchToProps = (dispatch) => {
	return {
		pushPanel: () => dispatch(increaseIndex()),
		popPanel: () => dispatch(decreaseIndex())
	}
};

export default MoonstoneDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
