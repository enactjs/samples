import React from 'react';
import kind from '@enact/core/kind';
import FileBrowser from '../components/FileBrowser';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<FileBrowser {...props} />
	)
});

export default MainPanel;
