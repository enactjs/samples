import React from 'react';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution'
import {Item} from '@enact/moonstone/Item';
import {Spottable} from '@enact/spotlight';
import {VirtualList} from '@enact/moonstone/VirtualList'

import DynamicPanel from '../DynamicPanel';
import Navigable from '../Navigable';

const cDir = ['foo3.txt'];
const bDir = [cDir, 'bar.txt'];
const aDir = [bDir, 'foo.txt'];

const a = {
	files: [
		{name: 'b', directory: true},
		{name: 'cat.jpg'},
		{name: 'dog.jpg'}
	]
};

const b = {
	files: [
		{name: 'c', directory: true},
		{name: '123.jpg'},
		{name: 'abc.jpg'}
	]
};

const c = {
	files: [
		{name: 'foo.jpg'},
		{name: 'bar.jpg'}
	]
};

const scale = ri.scale;

const clickTest = ({...rest}) => {
	console.log('CLICKY CLICKY', rest);
}

const FileBrowserBase = kind({
	name: 'FileBrowserBase',
	computed: {
		listItem: (props) => ({data, index, key, ...inner}) => {
			console.log('LIST ITEM OUTER PROPS', props);
			console.log('LIST ITEM INNER PROPS', Object.assign({data, index, key}, inner));
			return (
				<Item key={key} onClick={props.onNavigateY} >
					{data[index].name}
				</Item>
			);
		}
	},
	render: (props) => {
		const {listItem, ...rest} = props;
		console.log('FileBrowserBase', props);
		return (
			<DynamicPanel {...rest} >
				<VirtualList
					itemSize={scale(72)}
					component={listItem}
					data={a.files}
					dataSize={a.files.length}
				/>
			</DynamicPanel>
		);
	}
});

const FB = class extends React.Component {
	// constructor (props) {
	// 	super(props);
	//
	// 	this.state = {
	// 		path: props.path
	// 	}
	// }

	navigate ({path}) {
		console.log('FileBrowser onNavigate', path);
		this.setState({path: path});
	}

	render () {
		const props = Object.assign({
			onNavigateX: (p) => this.navigate(p),
			onNavigateY: this.navigate
		}, this.props);
		console.log('STATEFUL FileBrowser RENDERING', props);
		return (
			<FileBrowserBase {...props} />
		);
	}
};

const FileBrowser = Navigable(Spottable(FB));

export default FileBrowser;
export {FileBrowser, FileBrowserBase};
