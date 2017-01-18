import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import CheckboxItem from '@enact/moonstone/CheckboxItem';

const CityItem = kind({
	name: 'CityItem',

	propTypes: {
		city: PropTypes.string.isRequired,
		onCityChange: PropTypes.func.isRequired,
		selected: PropTypes.bool
	},

	render: ({city, onCityChange, selected, ...rest}) => {
		delete rest.dispatch;

		return (
			<CheckboxItem
				{...rest}
				onToggle={onCityChange}
				selected={selected}
				value={city}
			>
				{city}
			</CheckboxItem>
		)
	}
})

const mapStateToProps = (state, ownProps) => {
	const country = state.country;
	const city = ownProps.city
		.split(' ')
		.join('')
		.toLowerCase();

	return city in state.data[country] ? {selected: state.data[country][city].selected} : {selected : false};
};

const CityItemContainer = connect(mapStateToProps)(CityItem);

export default CityItemContainer;
