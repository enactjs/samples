import {connect} from 'react-redux';
import {changeCity, changeCountry} from '../actions';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
	return ({
		data: state.data
	});
};

const mapDispatchToProps = (dispatch) => ({
	onCountryChange: (country, city) => {
		dispatch(changeCountry(country));
		dispatch(changeCity(city));
	}
});

const NavContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);

export default NavContainer;
