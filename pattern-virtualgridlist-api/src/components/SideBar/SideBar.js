import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line no-unused-vars
import {adaptEvent, handle, forward} from '@enact/core/handle';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Group from '@enact/ui/Group';

import css from './SideBar.module.less';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		onAlbumChange: PropTypes.func.isRequired,
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

	render: ({albums, onAlbumChange, ...rest}) => {
		delete rest.albums;
		delete rest.onAlbumChange;

		return (
			<Group
				childComponent={SelectableItem}
				selectedProp="selected"
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
