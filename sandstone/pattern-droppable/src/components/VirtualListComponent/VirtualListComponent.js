import Item from '@enact/sandstone/Item';
import {VirtualList} from '@enact/sandstone/VirtualList';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import {Draggable} from '../Draggable/Draggable';

const VirtualListComponent = ({children, items, ...rest}) => {
	const dataSize = items.length;
	const TransferItem = Draggable(Item);

	const generateItems = useCallback(({index}) => {
		return <TransferItem className="droppable-item">{items[index]}</TransferItem>;
	}, [items]);

	return (
		<VirtualList
			title={children}
			itemSize={200}
			dataSize={dataSize}
			itemRenderer={generateItems}
			style={{width: '50%'}}
			{...rest}
		/>
	);
};

VirtualListComponent.propTypes = {
	items: PropTypes.array
};

export default VirtualListComponent;
