import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import Repeater from '@enact/ui/Repeater';
import React from 'react';

import Kitten from '../components/Kitten';

const ListBase = kind({
	name: 'List',

	propTypes: {
		children: React.PropTypes.array,
		onSelectKitten: React.PropTypes.func
	},

	render: ({children, onSelectKitten, ...rest}) => (
		<Panel {...rest}>
			<Header title="Kittens!" />
			<Repeater childComponent={Kitten} indexProp="index" itemProps={{onSelect: onSelectKitten}}>
				{children}
			</Repeater>
		</Panel>
	)
});

export default ListBase;
export {ListBase as List, ListBase};
