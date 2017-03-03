import {Header, Panel} from '@enact/moonstone/Panels';
import React from 'react';

const View = ({className, title, view: ComponentView}) => (
	<Panel className={className}>
		<Header title={title} type='compact' />
		<ComponentView />
	</Panel>
);

export default View;
