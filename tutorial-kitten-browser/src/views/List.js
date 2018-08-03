import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Repeater from '@enact/ui/Repeater';

import Kitten from '../components/Kitten';

const ListBase = kind({
	name: 'List',

	propTypes: {
		children: PropTypes.array,
		onSelectKitten: PropTypes.func
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
