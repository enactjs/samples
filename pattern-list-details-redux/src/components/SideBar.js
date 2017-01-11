import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import VirtualList from '@enact/moonstone/VirtualList';
import css from './SideBar.less';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		cities: PropTypes.array.isRequired,
		onCityChange: PropTypes.func.isRequired,
		selectedCity: PropTypes.string.isRequired,
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
		virtualListItem: ({onCityChange, selectedCity}) => ({data, index, key}) => {
			const city = data[index];
			return (
				<CheckboxItem
					onToggle={onCityChange}
					key={key}
					selected={selectedCity === city}
					value={city}
				>
					{city}
				</CheckboxItem>
			)
		}
	},

	render: ({cities, virtualListItem, ...rest}) => {
		delete rest.onCityChange;
		delete rest.selectedCity;
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
