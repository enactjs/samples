import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Divider from '@enact/moonstone/Divider';
import css from './SideBar.less';


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

	computed: {
		className: ({styler}) => {
			return styler.append(css.sideBar);
		},
		albumList: ({albums, onAlbumChange, selectedAlbum}) => {
			return albums.map((album, index) => {
				return (
					<div key={index}>
						<SelectableItem
							onToggle={onAlbumChange}
							selected={selectedAlbum == album}
							value={album}
						>
							{album}
						</SelectableItem>
						<Divider />
					</div>
				);
			});
		}
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
