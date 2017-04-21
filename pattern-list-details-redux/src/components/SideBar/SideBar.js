import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import CityItem from './CityItem';
import css from './SideBar.less';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		cities: PropTypes.array.isRequired,
		onCityChange: PropTypes.func.isRequired,
		zoom: PropTypes.bool
	},

	styles: {
		css,
		className: 'sideBar'
	},

	computed: {
		className: ({zoom, styler}) => {
			return styler.append(css.sideBar, {zoom});
		},
		cityList: ({cities, onCityChange, ...rest}) => {
			delete rest.zoom;

			return cities.map((city, index) => {
				return (
					<CityItem
						{...rest}
						city={city}
						key={index}
						onCityChange={onCityChange}
					/>
				);
			});
		}
	},

	render: ({cityList, ...rest}) => {
		delete rest.cities;
		delete rest.onCityChange;
		delete rest.zoom;

		return (
			<div {...rest}>
				{cityList}
			</div>
		);
	}
});

export default SideBar;
