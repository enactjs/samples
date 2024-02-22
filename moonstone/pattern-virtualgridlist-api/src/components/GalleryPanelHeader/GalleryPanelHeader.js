import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import {Header} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
	addItem as addAction,
	deleteItem as deleteAction,
	selectAll as selectAllAction,
	selectionEnable as selectionEnableAction
} from '../../store';

const createMockItem = (album, albumSize, showOverlay) => {
	const
		dataLength = albumSize,
		caption = (dataLength % 8 === 0) ? ' with long title' : '',
		subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		selected: false,
		selectionOverlayShowing: showOverlay,
		caption: album + ' ' + dataLength + caption,
		subCaption: subCaption,
		source: 'https://placehold.co/300x300/' + color + '/ffffff/png?text=Image+' + dataLength
	};
};

const GalleryPanelHeader = kind({
	name: 'GalleryPanelHeader',

	propTypes: {
		showOverlay: PropTypes.bool.isRequired,
		addItem: PropTypes.func,
		album: PropTypes.string,
		albumSize: PropTypes.number,
		deleteItem: PropTypes.func,
		selectAll: PropTypes.func,
		selectionEnable: PropTypes.func
	},

	handlers: {
		addMockItem: (ev, {addItem, album, albumSize, showOverlay}) => {
			addItem(createMockItem(album, albumSize, showOverlay));
		},
		deleteItem: (ev, {deleteItem}) => {
			deleteItem();
		},
		selectAll: (ev, {selectAll}) => {
			selectAll();
		},
		showSelectionOverlayHandler: (ev, {selectionEnable}) => {
			selectionEnable();
		}
	},

	computed: {
		selectionPreviousButton: ({showOverlay, showSelectionOverlayHandler}) => {
			const
				tooltipText = showOverlay ? 'Previous' : 'Selection',
				icon = showOverlay ? 'rollbackward' : 'check';
			return (
				<IconButton onClick={showSelectionOverlayHandler} size="small" tooltipText={tooltipText}>{icon}</IconButton>
			);
		},
		addButton: ({addMockItem, showOverlay}) => {
			if (!showOverlay) {
				return (<IconButton onClick={addMockItem} size="small" tooltipText="Add Item">plus</IconButton>);
			}
		},
		deleteButton: ({deleteItem, showOverlay}) => {
			if (showOverlay) {
				return (<Button onClick={deleteItem} size="small">Delete</Button>);
			}
		},
		selectAllButton: ({selectAll, showOverlay}) => {
			if (showOverlay) {
				return (<Button onClick={selectAll} size="small">Select All</Button>);
			}
		}
	},

	render: ({addButton, deleteButton, selectAllButton, selectionPreviousButton, ...rest}) => {
		delete rest.album;
		delete rest.albumSize;
		delete rest.addItem;
		delete rest.addMockItem;
		delete rest.deleteItem;
		delete rest.selectAll;
		delete rest.selectionEnable;
		delete rest.showOverlay;
		delete rest.showSelectionOverlayHandler;

		return (
			<Header {...rest}>
				{addButton}
				{deleteButton}
				{selectAllButton}
				{selectionPreviousButton}
			</Header>
		);
	}
});

const mapStateToProps = ({data}) => ({
	album: data.album,
	albumSize: data.dataOrder.length,
	showOverlay: data.showOverlay
});

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (item) => dispatch(addAction(item)),
		deleteItem: () => dispatch(deleteAction()),
		selectionEnable: () => dispatch(selectionEnableAction()),
		selectAll: () => dispatch(selectAllAction())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPanelHeader);
