import {connect} from 'react-redux';
import {changeZoom} from '../actions';
import Content from '../components/Content';

const mapStateToProps = (state) => {
	return ({
		selectedCity: state.city,
		zoomState: state.zoom
	});
};

const mapDispatchToProps = (dispatch) => ({
	onZoom: (zoom) => {
		dispatch(changeZoom(zoom));
	}
});

const ContentContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);

export default ContentContainer;
