import {connect} from 'react-redux';
import {zoomIn} from '../actions';
import Content from '../components/Content';

const mapStateToProps = (state) => {
	return ({
		selectedCity: state.city
	});
};

const mapDispatchToProps = (dispatch) => ({
	onZoom: () => {
		dispatch(zoomIn());
	}
});

const ContentContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);

export default ContentContainer;
