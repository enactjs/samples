import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import CheckboxItem from '@enact/moonstone/CheckboxItem';

const CityItem = kind({
	name: 'CityItem',

	propTypes: {
		city: PropTypes.string.isRequired,
		onCityChange: PropTypes.func.isRequired,
		selectedCity: PropTypes.string.isRequired
	},

	render: ({city, onCityChange, selectedCity, ...rest}) => {
		delete rest.dispatch;

		return (
			<CheckboxItem
				{...rest}
				onToggle={onCityChange}
				selected={city === selectedCity}
				value={city}
			>
				{city}
			</CheckboxItem>
		)
	}
})

const mapStateToProps = (state) => ({
	selectedCity: state.city
});

const CityItemContainer = connect(mapStateToProps)(CityItem);

export default CityItemContainer;
