import {connect} from 'react-redux';
import {changeCity} from '../redux-actions/actions';
import SideBar from '../components/SideBar';

const mapStateToProps = (state) => {
	return ({
		selectedCountry: state.country,
		selectedCity: state.city,
		zoomed: state.zoom
	});
};

const mapDispatchToProps = (dispatch) => ({
	onCityChange: (city) => {
		// Dipatch the change to state.saved
		dispatch(changeCity(city.target.textContent));

		// Add other things you want to do when the state.saved is changed
	}
});

const SideBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);

export default SideBarContainer;
