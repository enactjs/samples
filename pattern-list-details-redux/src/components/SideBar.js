import React, {PropTypes} from 'react';
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
		zoom: PropTypes.bool
	},

	defaultProps: {
		selectedCountry: 'usa',
		selectedCity: 'San Francisco',
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
							onClick={onCityChange}
							selected={selectedCity === city}
						>
							{city}
						</SelectableItem>
						<Divider />
					</div>
				);
			});
		}
	},

	render: ({cityList, minimizeSidebar, ...rest}) => {
		delete rest.cities;
		delete rest.onCityChange;
		delete rest.selectedCity;
		delete rest.selectedCountry;
		delete rest.zoom;

		return (
			<div {...rest} style={minimizeSidebar}>
				{cityList}
			</div>
		);
	}
});

export default SideBar;
