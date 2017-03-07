import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import MainView from '../views/MainView';
import FileBrowser from '../components/FileBrowser';
import css from './App.less';

// This would be replaced by redux but Changeable is a handy single-value, single-event state HOC
const Browser = Changeable(
	{prop: 'path', change: 'onNavigate'},
	FileBrowser
);
import {navigate} from '../actions';

const App = kind({
	name: 'App',

	propTypes: {
		path: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
	},

	defaultProps: {
		path: '/a/b/c'
	},

	styles: {
		css,
		className: 'app'
	},

	// render: (props) => (
	// 	<div {...props}>
	// 		<Browser defaultPath="/a" />
	// 	</div>
	// ),
	render: ({path, ...rest}) => (
		<div {...rest}>
			<MainView path={path} />
		</div>
	)
});

const mapStateToProps = ({path}) => ({
	path
});

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: () => dispatch(navigate())
	};
};

export default MoonstoneDecorator(connect(mapStateToProps, mapDispatchToProps)(App));
