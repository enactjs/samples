import {connect} from 'react-redux';
import {setPreview} from '../actions';
import PhotoSlider from '../components/PhotoSlider';

const mapStateToProps = (state) => {
	return ({
		position: state.photo.position
	});
};

const mapDispatchToProps = (dispatch) => ({
	setPreview: (newPhoto) => {
		// Dipatch the change to state.photo
		dispatch(setPreview(newPhoto));

		// Add other things you want to do when the state.photo is changed
	}
});

const SliderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PhotoSlider);

export default SliderContainer;
