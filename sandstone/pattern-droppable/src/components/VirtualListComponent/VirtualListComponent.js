import Item from '@enact/sandstone/Item';
import {VirtualList} from '@enact/sandstone/VirtualList';
import {useCallback} from "react";

const VirtualListComponent = ({children, dataSize, ...rest}) => {
	const generateItems = useCallback((data) => {
		return <div className='draggable'>
			<Item className='droppable-component'>Element{children} - {data.index}</Item>
		</div>
	}, [children]);

	return (
		<VirtualList
			itemSize={200}
			dataSize={dataSize}
			itemRenderer={generateItems}
			style={{width: '50%'}}
			{...rest}
		/>
	);
};

export default VirtualListComponent;
