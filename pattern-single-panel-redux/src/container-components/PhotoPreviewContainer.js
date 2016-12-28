import {connect} from 'react-redux';
import PhotoPreview from '../components/PhotoPreview';

const mapStateToProps = (state) => {
	return ({
		url: state.photo.url,
		size: state.photo.size
	});
};

const ProfilePhotoPickerContainer = connect(
	mapStateToProps,
	null
)(PhotoPreview);

export default ProfilePhotoPickerContainer;
