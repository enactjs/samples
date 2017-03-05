import React from 'react';
import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
// import {Spottable} from '@enact/spotlight';

// import {Navigable} from '../Navigable';

const DynamicPanelBase = kind({
	name: 'DynamicPanelBase',
	render: ({children, path, ...rest}) => {
		delete rest.onNavigate;
		console.log("DynamicPanelBase path:", path);

		return (
			<Panel {...rest} >
				<Header title={`DynamicPanelBase: ${path}`} />
				{children}
			</Panel>
		);
	}
});

// const DynamicPanel = Navigable(Spottable(DynamicPanelBase));
const DynamicPanel = DynamicPanelBase;

export default DynamicPanel;
export {DynamicPanel, DynamicPanelBase};