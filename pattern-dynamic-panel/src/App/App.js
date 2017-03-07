import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import MainView from '../views/MainView';
import css from './App.less';

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
