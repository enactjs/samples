import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import ToggleItem from '@enact/moonstone/ToggleItem';
import VirtualList from '@enact/moonstone/VirtualList';
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
		cityList: ({cities, selectedCountry}) => {
			return cities[selectedCountry];
		},
		className: ({zoom, styler}) => {
			return styler.append(css.sideBar, {zoom});
		},
		numberOfCities: ({cities, selectedCountry}) => {
			return cities[selectedCountry].length;
		},
		virtualListItem: ({onCityChange, selectedCity}) => ({data, index, key}) => {
			const city = data[index];
			return (
				<div key={key}>
					<ToggleItem
						icon='circle'
						onToggle={onCityChange}
						selected={selectedCity === city}
						value={city}
					>
						{city}
					</ToggleItem>
				</div>
			)
		}
	},

	render: ({cityList, numberOfCities, virtualListItem, ...rest}) => {
		delete rest.cities;
		delete rest.onCityChange;
		delete rest.selectedCity;
		delete rest.selectedCountry;
		delete rest.zoom;

		return (
			<VirtualList
				{...rest}
				data={cityList}
				dataSize={numberOfCities}
				itemSize={5}
				spacing={0}
				component={virtualListItem}
			/>
		);
	}
});

export default SideBar;
