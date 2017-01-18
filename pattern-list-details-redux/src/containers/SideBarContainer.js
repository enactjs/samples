import {connect} from 'react-redux';
import {changeCity} from '../actions';
import SideBar from '../components/SideBar';

const mapStateToProps = (state) => {
	return {
		cities: state.data[state.country].cityList,
		zoom: state.zoom
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCityChange: (city) => {
			dispatch(changeCity(city.value));
		}
	};
};

const SideBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);

export default SideBarContainer;
