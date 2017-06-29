import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import Divider from '@enact/moonstone/Divider';
import SelectableItem from '@enact/moonstone/SelectableItem';

const CityItem = kind({
	name: 'CityItem',

	propTypes: {
		city: PropTypes.string.isRequired,
		onCityChange: PropTypes.func.isRequired,
		selected: PropTypes.bool
	},

	render: ({city, onCityChange, selected, ...rest}) => {
		return (
			<div {...rest}>
				<SelectableItem
					onToggle={onCityChange}
					selected={selected}
					value={city}
				>
					{city}
				</SelectableItem>
				<Divider />
			</div>
		);
	}
});

const mapStateToProps = (state, ownProps) => {
	const country = state.country;
	const city = ownProps.city
		.split(' ')
		.join('')
		.toLowerCase();

	return city in state.data[country] ? {selected: state.data[country][city].selected} : {selected : false};
};

const CityItemContainer = connect(mapStateToProps, {})(CityItem);

export default CityItemContainer;
