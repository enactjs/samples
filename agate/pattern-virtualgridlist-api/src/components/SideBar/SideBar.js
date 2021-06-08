import RadioItem from '@enact/agate/RadioItem';
import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';

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
				{...rest}
				childComponent={RadioItem}
				onSelect={onAlbumChange}
				select="radio"
				selectedProp="selected"
			>
				{albums}
			</Group>
		);
	}
});

export default SideBar;
