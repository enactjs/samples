import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

import VirtualListComponent from '../components/VirtualListComponent/VirtualListComponent';
import {Row} from "@enact/ui/Layout";
import Droppable from "../components/Droppable/Droppable";
import Item from "@enact/sandstone/Item";
import {Draggable} from "../components/Draggable/Draggable";

const VirtualListDrop = Droppable({}, VirtualListComponent);
const VirtualList = VirtualListComponent;


const MainPanel = kind({
	name: 'MainPanel',
	functional: true,

	render: (props) => {

		const onDragStart = (event) => {
			console.log(event)
			const element = document.elementsFromPoint(event.x, event.y).find(element => element.hasAttribute('draggable'));

			console.log('element:', element);
		}

		const onDrag = (event) => {
			event.preventDefault();
			console.log(event)
			console.log('dragging along');
		};

		const onDragEnd = (event) => {
			console.log(event)
			console.log('end')
		}

		const DraggableItem = Draggable(Item);

		return (
			<Panel {...props}>
				<Header title="Hello world!"/>
				<Row style={{height: '100%'}}>
					<VirtualListDrop dataSize={10}>Drop</VirtualListDrop>
					<VirtualList dataSize={10} />
					<DraggableItem
						style={{width: '300px'}}
					>
						Itemasadsd2
					</DraggableItem>
				</Row>
			</Panel>
		);
	}
});

export default MainPanel;
