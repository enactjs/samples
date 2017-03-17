import Divider from '@enact/moonstone/Divider';
import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';
import SelectableItem from '@enact/moonstone/SelectableItem';

import css from './SideBar.less';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		albums: PropTypes.array,
		onAlbumChange: PropTypes.func.isRequired,
		selectedAlbum: PropTypes.string.isRequired
	},

	styles: {
		css,
		className: 'sideBar'
	},

	computed: {
		albumList: ({albums, onAlbumChange, selectedAlbum}) => albums.map((album, index) => {
			return (
				<div key={index}>
					<SelectableItem
						onToggle={onAlbumChange}
						selected={selectedAlbum === album}
						value={album}
					>
						{album}
					</SelectableItem>
					<Divider spacing="small" />
				</div>
			);
		})
	},

	render: ({albumList, ...rest}) => {
		delete rest.albums;
		delete rest.onAlbumChange;
		delete rest.selectedAlbum;

		return (
			<div {...rest}>
				{albumList}
			</div>
		);
	}
});

export default SideBar;
