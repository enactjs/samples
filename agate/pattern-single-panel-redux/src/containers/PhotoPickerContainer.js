import {connect} from 'react-redux';

import {changePhotoIndex} from '../store';
import PhotoPicker from '../components/PhotoPicker';

const mapStateToProps = (state) => {
	return ({
		photoIndex: state.photoIndex
	});
};

const mapDispatchToProps = (dispatch) => ({
	// Dispatch the change to state.photo
	changePhotoIndex: (newIndex) => {
		dispatch(changePhotoIndex(newIndex));

		// Add other things you want to do when the state.photo is changed
	}
});

const PhotoPickerContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoPicker);

export default PhotoPickerContainer;
