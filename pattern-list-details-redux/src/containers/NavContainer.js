import {connect} from 'react-redux';
import {changeCountry, changeCity} from '../actions';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
	return ({
		selectedCountry: state.country
	});
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	onCountryChange: (country) => {
		const countryName = country.target.textContent.toLowerCase();

		dispatch(changeCountry(countryName));
		dispatch(changeCity(ownProps.cities[countryName][0]));
	}
});

const NavContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);

export default NavContainer;
