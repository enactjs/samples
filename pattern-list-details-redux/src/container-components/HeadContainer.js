import {connect} from 'react-redux';
import {changeCountry} from '../redux-actions/actions';
import Head from '../components/Head';

const mapStateToProps = (state) => {
	return ({
		selectedCountry: state.country
	});
};

const mapDispatchToProps = (dispatch) => ({
	onCountryChange: (country) => {
		// Dipatch the change to state.saved
		dispatch(changeCountry(country.target.textContent.toLowerCase()));

		// Add other things you want to do when the state.saved is changed
	}
});

const HeadContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Head);

export default HeadContainer;
