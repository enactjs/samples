import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import {adaptEvent, handle, forward} from '@enact/core/handle';
import PropTypes from 'prop-types';
import React from 'react';
import SelectableItem from '@enact/moonstone/SelectableItem';

const CityItem = kind({
	name: 'CityItem',

	propTypes: {
		city: PropTypes.string.isRequired,
		onCityChange: PropTypes.func.isRequired,
		selected: PropTypes.bool
	},

	handlers: {
		onCityChange: handle(
			adaptEvent((ev, {city}) => ({type: 'onCityChange', city}), forward('onCityChange'))
		)
	},

	render: ({city, onCityChange, selected, ...rest}) => (
		<SelectableItem
			{...rest}
			onToggle={onCityChange}
			selected={selected}
			value={city}
		>
			{city}
		</SelectableItem>
	)
});

const mapStateToProps = (state, ownProps) => {
	const country = state.country;
	const city = ownProps.city
		.replace(/ /g, '')
		.toLowerCase();

	return city in state.data[country] ? {selected: state.data[country][city].selected, value: city} : {selected : false, value: city};
};

const CityItemContainer = connect(mapStateToProps, {})(CityItem);

export default CityItemContainer;
