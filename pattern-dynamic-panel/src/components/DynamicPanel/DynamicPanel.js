import React from 'react';
import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';

const DynamicPanelBase = kind({
	name: 'DynamicPanelBase',
	render: ({children, path, ...rest}) => {
		delete rest.onNavigate;

		return (
			<Panel {...rest} >
				<Header title={path} />
				{children}
			</Panel>
		);
	}
});

const DynamicPanel = DynamicPanelBase;

export default DynamicPanel;
export {DynamicPanel, DynamicPanelBase};