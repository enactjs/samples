/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {decreaseIndex, increaseIndex} from '../store';
import MainPanel from '../views/MainPanel';

const AppBase = kind({
	name: 'App',

	functional: true,

	propTypes: {
		index: PropTypes.number,
		popPanel: PropTypes.func,
		pushPanel: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	render: ({...rest}) => {
		const dispatch = useDispatch();
		const index = useSelector(state => state.index);

		const pushPanel = useCallback(() => dispatch(increaseIndex()), [dispatch]);
		const popPanel = useCallback(() => dispatch(decreaseIndex()), [dispatch]);

		return (
			<ActivityPanels {...rest} index={index} onSelectBreadcrumb={popPanel}>
				<MainPanel onClick={pushPanel} title="First" />
				<MainPanel onClick={pushPanel} title="Second" />
				<MainPanel onClick={pushPanel} title="Third" />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
});

const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
