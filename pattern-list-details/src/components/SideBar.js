import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Divider from '@enact/moonstone/Divider';
import css from './SideBar.less';


const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		onCityChange: PropTypes.func.isRequired,
		selectedCity: PropTypes.string.isRequired,
		selectedCountry: PropTypes.string.isRequired,
		cities: PropTypes.object,
		zoom: PropTypes.bool
	},

	defaultProps: {
		zoom: false
	},

	styles: {
		css,
		className: 'sideBar'
	},

	computed: {
		className: ({zoom, styler}) => {
			return styler.append(css.sideBar, {zoom});
		},
		cityList: ({cities, onCityChange, selectedCountry, selectedCity}) => {
			return cities[selectedCountry].map((city, index) => {
				return (
					<div key={index}>
						<SelectableItem
							onToggle={onCityChange}
							selected={selectedCity === city}
							value={city}
						>
							{city}
						</SelectableItem>
						<Divider />
					</div>
				);
			});
		}
	},

	render: ({cityList, ...rest}) => {
		delete rest.cities;
		delete rest.onCityChange;
		delete rest.selectedCity;
		delete rest.selectedCountry;
		delete rest.zoom;

		return (
			<div {...rest}>
				{cityList}
			</div>
		);
	}
});

export default SideBar;
