import {Header, Panel} from '@enact/moonstone/Panels';
import React from 'react';

const View = ({title, view: Views, className}) => (
	<Panel className={className}>
		<Header title={title} type='compact' />
		<Views />
	</Panel>
);

export default View;
