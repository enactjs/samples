import kind from '@enact/core/kind';
import {Column, Row} from '@enact/ui/Layout';
import {Panel, Header} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import {useState} from 'react';

import {Draggable} from '../components/Draggable/Draggable';
import Droppable from '../components/Droppable/Droppable';
import VirtualListComponent from '../components/VirtualListComponent/VirtualListComponent';

const MainPanel = kind({
	name: 'MainPanel',
	functional: true,

	render: (props) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [items, setItems] = useState(['Blue', 'Yellow', 'Red', 'Magenta', 'Green']);

		const DraggableItem = Draggable(Item);

		const VirtualList = VirtualListComponent;
		const VirtualListDrop = Droppable({setterFunction: setItems}, VirtualListComponent);

		return (
			<Panel {...props}>
				<Header title="Hello world!" />
				<Row style={{height: '100%'}}>
					<VirtualListDrop items={items} >Drop</VirtualListDrop>
					<VirtualList items={items} />
					<Column>
						<DraggableItem
							style={{width: '300px'}}
						>
							Item1
						</DraggableItem>
						<DraggableItem
							style={{width: '300px'}}
						>
							Item2
						</DraggableItem>
						<DraggableItem
							style={{width: '300px'}}
						>
							Item3
						</DraggableItem>
					</Column>
				</Row>
			</Panel>
		);
	}
});

export default MainPanel;
