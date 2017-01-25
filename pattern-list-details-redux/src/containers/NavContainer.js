import {connect} from 'react-redux';
import {changeCountry} from '../actions';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
	return {
		countries: state.data.countryList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCountryChange: ({country}) => {
			dispatch(changeCountry(country));
		}
	};
};

const NavContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);

export default NavContainer;
