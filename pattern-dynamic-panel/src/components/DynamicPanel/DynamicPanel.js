import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const DynamicPanelBase = kind({
	name: 'DynamicPanelBase',
	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.string
	},
	render: ({children, path, ...rest}) => {
		delete rest.onNavigate;

		return (
			<Panel {...rest} >
				<Header title={path} titleBelow="Press [ESC] to return to previous path" />
				{children}
			</Panel>
		);
	}
});

export default DynamicPanelBase;
export {DynamicPanelBase as DynamicPanel, DynamicPanelBase};
