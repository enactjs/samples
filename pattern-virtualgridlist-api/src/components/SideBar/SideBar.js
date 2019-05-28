import Divider from '@enact/moonstone/Divider';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {adaptEvent, handle, forward} from '@enact/core/handle';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Group from '@enact/ui/Group';

import css from './SideBar.module.less';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		onAlbumChange: PropTypes.func.isRequired,
		selectedAlbum: PropTypes.string.isRequired,
		albums: PropTypes.array
	},

	styles: {
		css,
		className: 'sideBar'
	},

	handlers: {
		onAlbumChange: handle(
			adaptEvent(ev => ({type: 'onChangeAlbum', album: ev.data}), forward('onAlbumChange')))
	},

	render: ({albums, onAlbumChange, selectedAlbum, ...rest}) => {
		delete rest.albums;
		delete rest.onAlbumChange;
		delete rest.selectedAlbum;

		return (
			<Group 
				childComponent={SelectableItem}
				selectedProp="selected"
				defaultSelected={0}
				onSelect={onAlbumChange}
				select="radio"
				{...rest}
			>
				{albums}
			</Group>
		);
	}
});

export default SideBar;
