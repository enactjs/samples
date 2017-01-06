import {connect} from 'react-redux';
import {changeCity} from '../actions';
import SideBar from '../components/SideBar';

const mapStateToProps = (state) => {
	return ({
		selectedCountry: state.country,
		selectedCity: state.city,
		zoom: state.zoom
	});
};

const mapDispatchToProps = (dispatch) => ({
	onCityChange: (city) => {
		dispatch(changeCity(city.value));
	}
});

const SideBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);

export default SideBarContainer;
