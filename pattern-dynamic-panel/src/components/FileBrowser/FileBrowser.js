import React from 'react';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution'
import {Cancelable} from '@enact/ui/Cancelable';
import {Item} from '@enact/moonstone/Item';
import {VirtualList} from '@enact/moonstone/VirtualList';

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

const navOrView = ({...rest}) => {
	console.log('CHOOSE TO NAV TO NEW DIR OR VIEW FILE', rest);
};

const cancel = (args) => {
	console.log('GOOD LUCK', args);
}

const FileBrowserBase = kind({
	name: 'FileBrowserBase',

	handlers: {
		onKeyUp: (ev, {onCancel, onNavigate, path}) => {
			console.log('HMM');
		},
		onNavigate: (ev, {onCancel, onNavigate, path}) => {
			console.log('HANDLERS HUH', path);
			console.log('NEED TO DECIDE IF VIEW OR NAV, IF NAV, BACK OR FORWARD');
			onNavigate({path});
			console.log('CAN CANCEL', onCancel);
		}
	},

	computed: {
		listItem: ({onNavigate, ...rest}) => ({data, index, key, ...inner}) => {
			console.log('LIST ITEM OUTER PROPS', Object.assign({onNavigate}, rest));
			console.log('LIST ITEM INNER PROPS', Object.assign({data, index, key}, inner));
			return (
				<Item key={key} onClick={onNavigate} >
					{data[index].name}
				</Item>
			);
		}
	},

	render: ({listItem, onKeyUp, ...rest}) => {
		console.log('FILEBROWSER BASE RENDER', rest);
		console.log('HAVE ONKEYUP', onKeyUp);
		return (
			<VirtualList
				itemSize={scale(72)}
				component={listItem}
				data={a.files}
				dataSize={a.files.length}
			/>
		);
	}
});

const FileBrowser = Cancelable({onCancel: 'onNavigate'}, FileBrowserBase);

export default FileBrowser;
export {FileBrowser, FileBrowserBase};