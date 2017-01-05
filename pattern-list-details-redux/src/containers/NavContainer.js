import {connect} from 'react-redux';
import {changeCountry} from '../actions';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
	return ({
		selectedCountry: state.country
	});
};

const mapDispatchToProps = (dispatch) => ({
	onCountryChange: (country) => {
		dispatch(changeCountry(country.target.textContent.toLowerCase()));

		// Add other things you want to do when the state.saved is changed
	}
});

const NavContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);

export default NavContainer;
