import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Divider from '@enact/moonstone/Divider';

const cities = {
	usa: ['San Francisco', 'Los Angeles', 'New York City'],
	spain: ['Madrid', 'Barcelona', 'Valencia'],
	korea: ['Seoul', 'Busan', 'Daegu'],
	japan: ['Tokyo', 'Osaka', 'Kyoto']
};

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		onCityChange: PropTypes.func.isRequired,
		selectedCity: PropTypes.string.isRequired,
		selectedCountry: PropTypes.string.isRequired,
		zoomed: PropTypes.bool
	},

	defaultProps: {
		selectedCountry: 'usa',
		selectedCity: 'San Francisco',
		zoomed: false
	},

	computed: {
		minimizeSidebar: ({zoomed}) => {
			if (zoomed) {
				return {flex: '0'};
			}
		},
		cityList: ({onCityChange, selectedCountry, selectedCity}) => {
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

	render: ({className, cityList, minimizeSidebar, ...rest}) => {
		delete rest.onCityChange;
		delete rest.selectedCity;
		delete rest.selectedCountry;
		delete rest.zoomed;

		return (
			<div {...rest} className={className} style={minimizeSidebar}>
				{cityList}
			</div>
		);
	}
});

export default SideBar;
