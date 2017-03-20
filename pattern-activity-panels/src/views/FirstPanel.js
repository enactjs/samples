import React from 'react';
import ES5 from './ES5';

import {Panel, Header} from '@enact/moonstone/Panels';
import Divider from '@enact/moonstone/Divider';
import Button from '@enact/moonstone/Button';
import Changeable from '@enact/ui/Changeable';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import ExpandableList from '@enact/moonstone/ExpandableList';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import Icon from '@enact/moonstone/Icon';
import IconButton from '@enact/moonstone/IconButton';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import Input from '@enact/moonstone/Input';
import Item from '@enact/moonstone/Item';
import LabeledItem from '@enact/moonstone/LabeledItem';
import Picker from '@enact/moonstone/Picker';
import ProgressBar from '@enact/moonstone/ProgressBar';
import RadioItem from '@enact/moonstone/RadioItem';
import RangePicker from '@enact/moonstone/RangePicker';
import Scroller from '@enact/moonstone/Scroller';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Slider from '@enact/moonstone/Slider';
import {SwitchItemBase} from '@enact/moonstone/SwitchItem';
import ToggleButtonBase from '@enact/moonstone/ToggleButton';
import Toggleable from '@enact/ui/Toggleable';
import css from './App.less';

const ToggleableItem = Toggleable({
	toggle: 'onToggle',
	prop: 'checked'
});

const ToggleButton = Toggleable({
	toggle: 'onClick', prop: 'selected'
}, ToggleButtonBase);

const StatefulInput = Changeable(Input);
const StatefulRadioItem = ToggleableItem(RadioItem);
const StatefulCheckboxItem = ToggleableItem(CheckboxItem);
const StatefulSelectableItem = ToggleableItem(SelectableItem);
const StatefulPicker = Changeable(Picker);
const StatefulRangePicker = Changeable(RangePicker);
const SwitchItem = ToggleableItem(SwitchItemBase);
const emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'];

const App = ES5({
	React,

	Button,
	Divider,
	ExpandableList,
	ExpandablePicker,
	Header,
	Icon,
	IconButton,
	IncrementSlider,
	Item,
	LabeledItem,
	Panel,
	ProgressBar,
	Scroller,
	Slider,
	StatefulCheckboxItem,
	StatefulInput,
	StatefulPicker,
	StatefulRadioItem,
	StatefulRangePicker,
	StatefulSelectableItem,
	SwitchItem,
	ToggleButton,

	emoticons,
	css
});

// window.t = {
// 	React,
// 	Button
// };

// eval(`
// 	window.t.ButtonSample = () => {
// 		return t.React.createElement(t.Button, {}, 'Click');
// 	};
// `);

// const ButtonSample = window.t.ButtonSample;

const FirstPanel = ({title, onClick, ...rest}) => (
	<Panel {...rest}>
		<Header title={title}>
			<Button onClick={onClick}>Next</Button>
		</Header>
		<App />
	</Panel>
);

export default FirstPanel;
