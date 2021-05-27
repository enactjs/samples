import {adaptEvent, handle, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Item from '@enact/ui/Item';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
		<Item
			{...rest}
			onClick={onCityChange}
			selected={selected}
			style={{margin: '12px 0px', fontSize: '24px', cursor: 'default'}}
			value={city}
		>
			{city}
		</Item>
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
