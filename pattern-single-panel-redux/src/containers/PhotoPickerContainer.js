import {connect} from 'react-redux';
import {setPreview} from '../actions';
import PhotoPicker from '../components/PhotoPicker';

const mapStateToProps = (state) => {
	return ({
		index: state.photo.index
	});
};

const mapDispatchToProps = (dispatch) => ({
	// Dipatch the change to state.photo
	setPreview: (newPhoto) => {
		dispatch(setPreview(newPhoto));

		// Add other things you want to do when the state.photo is changed
	}
});

const ProfilePhotoPickerContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoPicker);

export default ProfilePhotoPickerContainer;
