import React from 'react';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels} from '@enact/moonstone/Panels';
import MainPanel from '../views/MainPanel';
import css from './App.less';
import {connect} from 'react-redux';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
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

export default connect(mapStateToProps, {})(MoonstoneDecorator(App));
