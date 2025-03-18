import {connect} from 'react-redux';

import {changeAlbum} from '../store';

const mapStateToProps = ({data}) => ({
	album: data.album
});

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeAlbum: (album) => dispatch(changeAlbum(album))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
