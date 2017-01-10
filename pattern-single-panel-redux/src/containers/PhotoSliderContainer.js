import {connect} from 'react-redux';
import {changePhotoPosition} from '../actions';
import PhotoSlider from '../components/PhotoSlider';

const mapStateToProps = (state) => {
	return ({
		photoPosition: state.photoPosition
	});
};

const mapDispatchToProps = (dispatch) => ({
	changePhotoPosition: (photoPosition) => {
		// Dipatch the change to state if photoPosition is not undefined
		if (photoPosition) {
			dispatch(changePhotoPosition(photoPosition));
		}
		// Add other things you want to do when the state.photo is changed
	}
});

const SliderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoSlider);

export default SliderContainer;
