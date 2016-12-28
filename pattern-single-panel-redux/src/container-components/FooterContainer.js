import {connect} from 'react-redux';
import {save} from '../redux-actions/actions';
import Footer from '../components/Footer';

const mapStateToProps = (state) => {
	return ({
		saved: state.saved
	});
};

const mapDispatchToProps = (dispatch) => ({
	saveToState: (saved) => {
		// Dipatch the change to state.saved
		dispatch(save(saved));

		// Add other things you want to do when the state.saved is changed
	}
});

const FooterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);

export default FooterContainer;
