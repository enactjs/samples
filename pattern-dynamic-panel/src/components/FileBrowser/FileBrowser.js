import React from 'react';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution';
import {Image} from '@enact/moonstone/Image';
import {Item} from '@enact/moonstone/Item';
import Cancelable from '@enact/ui/Cancelable';
import {VirtualList} from '@enact/moonstone/VirtualList';
import PropTypes from 'prop-types';

import butterfly from '../../../assets/images/butterfly.jpg';
import frozenwaterfall from '../../../assets/images/frozenwaterfall.jpg';
import jellyfish from '../../../assets/images/jellyfish.jpg';
import macaw from '../../../assets/images/macaw.jpg';
import ornaments from '../../../assets/images/ornaments.jpg';
import rainbow from '../../../assets/images/rainbow.jpg';

import DynamicPanel from '../DynamicPanel';

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
		{name: 'frozenwaterfall.jpg'}
	]
};

const mockFolders = {a, b, c};

const filePhotos = {
	butterfly,
	frozenwaterfall,
	jellyfish,
	macaw,
	ornaments,
	rainbow
};

const scale = ri.scale;

const FileBrowserBase = kind({
	name: 'FileBrowserBase',
	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.object
	},
	handlers: {
		// create a cached event handler forwarding to onNavigate
		onNavigate: (ev, props) => {
			// extract the index provided by VirtualList
			const index = ev.currentTarget.dataset.index;
			// extract the path object from props
			const pathInfo = props.path;
			// for mock system to know where to get files
			const leaf = pathInfo.path.split('/').pop();
			const file = mockFolders[leaf].files[index];
			// map it to the name from the hardcoded list of files
			const name = file.name;
			// make the new path
			const path = `${pathInfo.path}/${name}`;
			const pathData = {path, directory: file.directory || false};
			// and notify the handler
			props.onNavigate({path: pathData});
		}
	},
	computed: {
		// computed component pattern is not currently Enact eslint friendly
		// eslint-disable-next-line
		listItem: (props) => ({data, index, key, ...rest}) => (
			<Item key={key} onClick={props.onNavigate} {...rest}>
				{data[index].name}
			</Item>
		),
		// computed component pattern is not currently Enact eslint friendly
		// eslint-disable-next-line
		renderItem: () => ({listItem, path: pathData, ...rest}) => {
			const {path, directory} = pathData;
			const leaf = path.split('/').pop();

			const component = directory ? <VirtualList
				itemSize={scale(72)}
				component={listItem}
				data={mockFolders[leaf].files}
				dataSize={mockFolders[leaf].files.length}
			/> : <Image src={filePhotos[leaf.replace('.jpg', '')]} />;

			return (
				<DynamicPanel path={path} {...rest}>
					{component}
				</DynamicPanel>
			);

		}
	},
	render: ({renderItem: Component, ...rest}) => (
		<Component {...rest} />
	)
});

const popPath = (pathData) => {
	const path = pathData.path;
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
	return {path: newPath, directory: true}; // assume you can't drill "up" into a file above the current location
};

// the onCancel callback from the Cancelable config receives the Cancelable's props to both
// determine if it should cancel and how to handle the cancel. here, we're calling the onNavigate
// event callback.
const handleCancel = ({path, onNavigate}) => {
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
