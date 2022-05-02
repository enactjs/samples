import {connect} from 'react-redux';

import {changeCity} from '../store';
import SideBar from '../components/SideBar';

const mapStateToProps = (state) => {
	return {
		cities: state.data[state.country].cityList
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onCityChange: ({city}) => dispatch(changeCity(city))
	};
};

const SideBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);

export default SideBarContainer;
