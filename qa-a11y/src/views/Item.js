import {CheckboxItem as CheckboxItemBase} from '@enact/moonstone/CheckboxItem';
import Divider from '@enact/moonstone/Divider';
import Item from '@enact/moonstone/Item';
import {RadioItem as RadioItemBase} from '@enact/moonstone/RadioItem';
import React from 'react';
import {SelectableItem as SelectItemBase} from '@enact/moonstone/SelectableItem';
import {ToggleItem as ToggleItemBase} from '@enact/moonstone/ToggleItem';
import Toggleable from '@enact/ui/Toggleable'

const CheckboxItem = Toggleable({prop: 'selected'}, CheckboxItemBase);
const RadioItem = Toggleable({prop: 'selected'}, RadioItemBase);
const SelectableItem = Toggleable({prop: 'selected'}, SelectItemBase);
const ToggleItem = Toggleable({prop: 'selected'}, ToggleItemBase);

const ItemView = () => (
	<div>
		<Divider>Default Item</Divider>
		<Item aria-label="Default item" role="item">Item</Item>
		<Item disabled aria-label="disabled item" role="item">Disabled Item</Item>
		<Divider>Checkbox Item</Divider>
		<CheckboxItem aria-label="checkbox item" role="checkbox">Checkbox</CheckboxItem>
		<Divider>Radio Item</Divider>
		<RadioItem aria-label="radio item" role="radio">Radio item</RadioItem>
		<Divider>Selectable Item</Divider>
		<SelectableItem aria-label="select item" role="option">Selectable item</SelectableItem>
		<Divider>Toggle Item</Divider>
		<ToggleItem icon="lock" aria-label="toggle item" role="toggle">Toggle item</ToggleItem>
	</div>
);

export default ItemView;
