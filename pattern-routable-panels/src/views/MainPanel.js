import Button from '@enact/agate/Button';
import {Panel} from '@enact/agate/Panels';
import {Header} from '@enact/agate/Header';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import RouteTree from './RouteTree';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	computed: {
		text: ({next}) => `To ${next} Panel`
	},

	render: ({title, onClick, text, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} />
				<RouteTree />
				<Button onClick={onClick}>{text}</Button>
			</Panel>
		);
	}
});

export default MainPanel;
