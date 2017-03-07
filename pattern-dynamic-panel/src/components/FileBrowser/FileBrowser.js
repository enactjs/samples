import React from 'react';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution'
import {Item} from '@enact/moonstone/Item';
import Cancelable from '@enact/ui/Cancelable';
import {VirtualList} from '@enact/moonstone/VirtualList'

import DynamicPanel from '../DynamicPanel';

const cDir = ['foo3.txt'];
const bDir = [cDir, 'bar.txt'];
const aDir = [bDir, 'foo.txt'];

const a = {
	files: [
		{name: 'b', directory: true},
		{name: 'rainbow.jpg'},
		{name: 'macaw.jpg'}
	]
};

const b = {
	files: [
		{name: 'c', directory: true},
		{name: 'jellyfish.jpg'},
		{name: 'butterfly.jpg'}
	]
};

const c = {
	files: [
		{name: 'ornaments.jpg'},
		{name: 'frozen-waterfall.jpg'}
	]
};

const scale = ri.scale;

const FileBrowserBase = kind({
	name: 'FileBrowserBase',
	handlers: {
		// create a cached event handler forwarding to onNavigate
		onNavigate: (ev, props) => {
			// extract the index provided by VirtualList
			const index = ev.currentTarget.dataset.index;
			// map it to the name from the hardcoded list of files
			const name = a.files[index].name;
			// make the new path
			const path = `${props.path}/${name}`;
			// and notify the handler
			props.onNavigate({path});
		}
	},
	computed: {
		// this double function is messy but i'm assuming it's a requirement of VirtualList ... we
		// should fix that API
		listItem: (props) => ({data, index, key, ...rest}) => {
			return (
				<Item key={key} onClick={props.onNavigate} {...rest}>
					{data[index].name}
				</Item>
			);
		}
	},
	render: (props) => {
		const {listItem, ...rest} = props;

		return (
			<DynamicPanel {...rest}>
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

const popPath = (path) => {
	let newPath = '/';
	let lastPath = path;

	if (path) {
		const parts = path.split('/').filter((e) => e);
		lastPath = parts.pop();
		if (parts.length) {
			newPath += parts.join('/');
			if (!newPath) {
				newPath = '/';
			}
		} else {
			// nowhere to go
			newPath += lastPath ? lastPath : '';
		}
	}
	return newPath;
};

// the onCancel callback from the Cancelable config receives the Cancelable's props to both
// determine if it should cancel and how to handle the cancel. here, we're calling the onNavigate
// event callback.
const handleCancel = (props) => {
	const {path, onNavigate} = props;
	// pop the path
	const newPath = popPath(path);
	// and if there's an onNavigate callback
	if (onNavigate) {
		// call it with the new path
		onNavigate({
			path: newPath
		});

		// then return true to indicate it was handled
		return true;
	}
};

const FileBrowser = Cancelable(
	// modal lets it handle any cancel event that isn't handled by the spotted component. Useful for
	// full-screen containers like Panels (or Panel in this case)
	{modal: true, onCancel: handleCancel},
	FileBrowserBase
);

export default FileBrowser;
export {FileBrowser, FileBrowserBase};
