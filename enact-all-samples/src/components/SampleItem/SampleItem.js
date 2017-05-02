import React from 'react';
import Item from '@enact/moonstone/Item';

const itemSelect = (history, path) => history.push({pathname: path});


const SampleItem = ({children, path, history, rest}) => {
	return (
		<Item onClick={() => itemSelect(history, path)}>
			{children}
		</Item>
	);
};

export default SampleItem;