import {CheckboxItem as CheckboxItemBase} from '@enact/moonstone/CheckboxItem';
import Divider from '@enact/moonstone/Divider';
import Item from '@enact/moonstone/Item';
import LabeledItem from '@enact/moonstone/LabeledItem';
import {RadioItem as RadioItemBase} from '@enact/moonstone/RadioItem';
import React from 'react';
import {SelectableItem as SelectItemBase} from '@enact/moonstone/SelectableItem';
import {SwitchItem as SwitchItemBase} from '@enact/moonstone/SwitchItem';
import Toggleable from '@enact/ui/Toggleable';
import {ToggleItem as ToggleItemBase} from '@enact/moonstone/ToggleItem';

const CheckboxItem = Toggleable({prop: 'selected'}, CheckboxItemBase);
const RadioItem = Toggleable({prop: 'selected'}, RadioItemBase);
const SelectableItem = Toggleable({prop: 'selected'}, SelectItemBase);
const SwitchItem = Toggleable({prop: 'selected'}, SwitchItemBase);
const ToggleItem = Toggleable({prop: 'selected'}, ToggleItemBase);

const itemColumn = {
	display: 'inline-block',
	width: '50%',
	verticalAlign: 'top'
};

const ItemView = () => (
	<div>
		<div style={itemColumn}>
			<Divider>Default Item</Divider>
			<Item />
			<Item>Item</Item>
			<Item disabled>Disabled Item</Item>
			<Divider>Checkbox Item</Divider>
			<CheckboxItem>Checkbox</CheckboxItem>
			<Divider>Labeled Item</Divider>
			<LabeledItem label="This is a label">Labeled item</LabeledItem>
			<Divider>Radio Item</Divider>
			<RadioItem>Radio item</RadioItem>
			<Divider>Selectable Item</Divider>
			<SelectableItem>Selectable item</SelectableItem>
		</div>
		<div style={itemColumn}>
			<Divider>Switch Item</Divider>
			<SwitchItem>Switch item</SwitchItem>
			<Divider>Toggle Item</Divider>
			<ToggleItem icon="lock">Toggle item</ToggleItem>
			<Divider>Aria-labled Items</Divider>
			<Item aria-label="item">Item</Item>
			<LabeledItem label="This is a label" aria-label="labeled item">Labeled item</LabeledItem>
		</div>
	</div>
);

export default ItemView;
