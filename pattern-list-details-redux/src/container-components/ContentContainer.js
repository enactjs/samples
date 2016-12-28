import {connect} from 'react-redux';
import {zoomIn} from '../redux-actions/actions';
import Content from '../components/Content';

const mapStateToProps = (state) => {
	return ({
		selectedCity: state.city
	});
};

const mapDispatchToProps = (dispatch) => ({
	onZoom: () => {
		// Dipatch the change to state.saved
		dispatch(zoomIn());

		// Add other things you want to do when the state.saved is changed
	}
});

const ContentContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);

export default ContentContainer;
