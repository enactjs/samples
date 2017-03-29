import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import CityItem from './CityItem';
import VirtualList from '@enact/moonstone/VirtualList';
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
		virtualListItem: ({onCityChange}) => ({data, index, ...rest}) => {
			const city = data[index];

			return (
				<CityItem
					{...rest}
					city={city}
					onCityChange={onCityChange}
				/>
			);
		}
	},

	render: ({cities, virtualListItem, ...rest}) => {
		delete rest.onCityChange;
		delete rest.zoom;

		return (
			<VirtualList
				{...rest}
				data={cities}
				dataSize={cities.length}
				itemSize={5}
				spacing={0}
				component={virtualListItem}
			/>
		);
	}
});

export default SideBar;
