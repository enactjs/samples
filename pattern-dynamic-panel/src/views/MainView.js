import React from 'react';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution';
import {Header, Panel} from '@enact/moonstone/Panels';
import {Item} from '@enact/moonstone/Item';
import {VirtualList} from '@enact/moonstone/VirtualList';

import FileBrowserContainer from '../containers/FileBrowserContainer';

const scale = ri.scale;

const a = {
	files: [
		{name: 'b', directory: true},
		{name: 'cat.jpg'},
		{name: 'dog.jpg'}
	]
};

const MainView = kind({
	name: 'MainView',

	// computed: {
	// 	listItem: (props) => ({data, index, key, ...inner}) => {
	// 		console.log('LIST ITEM OUTER PROPS', props);
	// 		console.log('LIST ITEM INNER PROPS', Object.assign({data, index, key}, inner));
	// 		return (
	// 			<Item key={key} onClick={props.navigate} >
	// 				{data[index].name}
	// 			</Item>
	// 		);
	// 	}
	// },

	render: ({listItem, path, ...rest}) => (
		<Panel {...rest}>
			<Header title={`File Browser: ${path}`} type="compact" />
			{/*<VirtualList*/}
				{/*itemSize={scale(72)}*/}
				{/*component={listItem}*/}
				{/*data={a.files}*/}
				{/*dataSize={a.files.length}*/}
			{/*/>*/}
			<FileBrowserContainer />
		</Panel>
	)
});

export default MainView;

