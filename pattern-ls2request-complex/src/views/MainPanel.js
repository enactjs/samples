import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import {connect} from 'react-redux';

import {sendLS2Request} from '../actions';
import {getValue} from '../selectors';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		onClick: PropTypes.func,
		value: PropTypes.string
	},

	render: ({onClick, value, ...rest}) => (
		<Panel {...rest}>
			<Header title="Hello world!" />
			<Button onClick={onClick}>Click me</Button>
			<p>Value: {value}</p>
		</Panel>
	)
});

const mapStatesToProps = (state) => {
	return {
		value: getValue(state)
	};
};

const mapDispatchToProps = {
	onClick: sendLS2Request
};

export default connect(mapStatesToProps, mapDispatchToProps)(MainPanel);
