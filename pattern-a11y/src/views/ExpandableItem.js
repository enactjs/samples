import Divider from '@enact/moonstone/Divider';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import React from 'react';

const ExpandableItemView = () => (
	<div>
		<Divider>Default ExpandableItems</Divider>
		<ExpandableItem
			title="title"
		>
			<Item>
				This can be any type of content you might want to
				render inside a labeled expandable container
			</Item>
			<Item>
				<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
			</Item>
		</ExpandableItem>
	</div>
);

export default ExpandableItemView;
