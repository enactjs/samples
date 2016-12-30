import {connect} from 'react-redux';
import {setPreview} from '../redux-actions';
import PhotoSlider from '../components/PhotoSlider';

const mapStateToProps = (state) => {
	return ({
		size: state.photo.size
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
