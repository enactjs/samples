import {connect} from 'react-redux';

import {addItem, changeAlbum, deleteItem, selectAll, selectionEnable, toggleItem} from '../actions';

const mapStateToProps = ({data}) => ({
	data
});

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (item) => dispatch(addItem(item)),
		deleteItem: () => dispatch(deleteItem()),
		onChangeAlbum: (album) => dispatch(changeAlbum(album)),
		selectionEnable: () => dispatch(selectionEnable()),
		selectAll: () => dispatch(selectAll()),
		toggleItem: (id) => dispatch(toggleItem(id))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
