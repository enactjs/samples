import {CheckboxItem as CheckboxItemBase} from '@enact/moonstone/CheckboxItem';
import Divider from '@enact/moonstone/Divider';
import Item from '@enact/moonstone/Item';
import LabeledItem from '@enact/moonstone/LabeledItem';
import {RadioItem as RadioItemBase} from '@enact/moonstone/RadioItem';
import React from 'react';
import {SelectableItem as SelectItemBase} from '@enact/moonstone/SelectableItem';
import {SwitchItem as SwitchItemBase} from '@enact/moonstone/SwitchItem';
import {ToggleItem as ToggleItemBase} from '@enact/moonstone/ToggleItem';
import Toggleable from '@enact/ui/Toggleable'

const CheckboxItem = Toggleable({prop: 'selected'}, CheckboxItemBase);
const RadioItem = Toggleable({prop: 'selected'}, RadioItemBase);
const SelectableItem = Toggleable({prop: 'selected'}, SelectItemBase);
const SwitchItem = Toggleable({prop: 'selected'}, SwitchItemBase);
const ToggleItem = Toggleable({prop: 'selected'}, ToggleItemBase);

const ItemView = () => (
	<div>
		<Divider>Default Item</Divider>
		<Item aria-label="Default item" role="item">Item</Item>
		<Item disabled aria-disabled="true" aria-label="disabled item" role="item">Disabled Item</Item>
		<Divider>Checkbox Item</Divider>
		<CheckboxItem aria-label="checkbox item" role="checkbox">Checkbox</CheckboxItem>
		<Divider>Labeled Item</Divider>
		<LabeledItem label="This is a label" aria-label="label item" role="label">Labeled item</LabeledItem>
		<Divider>Radio Item</Divider>
		<RadioItem aria-label="radio item" role="radio">Radio item</RadioItem>
		<Divider>Selectable Item</Divider>
		<SelectableItem aria-label="select item" role="option">Selectable item</SelectableItem>
		<Divider>Switch Item</Divider>
		<SwitchItem aria-label="switch item" role="switch">Switch item</SwitchItem>
		<Divider>Toggle Item</Divider>
		<ToggleItem icon="lock" aria-label="toggle lock item" role="toggle">Toggle item</ToggleItem>
	</div>
);

export default ItemView;
