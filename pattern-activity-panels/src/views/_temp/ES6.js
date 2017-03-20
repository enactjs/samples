const ES6 = (comp) => {
	const t = {
		React: comp.React,

		Button: comp.Button,
		div: 'div',
		Divider: comp.Divider,
		ExpandableList: comp.ExpandableList,
		ExpandablePicker: comp.ExpandablePicker,
		Header: comp.Header,
		Icon: comp.Icon,
		IconButton: comp.IconButton,
		IncrementSlider: comp.IncrementSlider,
		Item: comp.Item,
		LabeledItem: comp.LabeledItem,
		Panel: comp.Panel,
		ProgressBar: comp.ProgressBar,
		Slider: comp.Slider,
		StatefulCheckboxItem: comp.StatefulCheckboxItem,
		StatefulInput: comp.StatefulInput,
		StatefulPicker: comp.StatefulPicker,
		StatefulRadioItem: comp.StatefulRadioItem,
		StatefulRangePicker: comp.StatefulRangePicker,
		StatefulSelectableItem: comp.StatefulSelectableItem,
		SwitchItem: comp.SwitchItem,
		ToggleButton: comp.ToggleButton,

		emoticons: comp.emoticons,
		css: comp.css
	};
	const React = t.React;

	return class App extends React.Component {
		static propTypes = {
			className: React.PropTypes.string
		}

		constructor (props) {
			super(props);
			this.state = {
				index: 0,
				open1: false,
				value1: 'Item 1',
				label1: 'Item 1',
				open2: false,
				value2: 2,
				label2: t.emoticons[2],
				inputValue: ''
			};
		}

		updateInput = (e) => this.setState({inputValue: e.value})

		headerClickHandler = (expNum) => () => {
			this.setState({
				['open' + expNum]: !this.state['open' + expNum]
			});
		}

		handleToggle = ({checked, value}) => {
			this.setState({
				lastChecked: checked,
				lastValue: value
			});
		}

		handleOpen = (expNum) => () => {
			this.setState({
				['open' + expNum]: true
			});
		}

		handleClose = (expNum) => () => {
			this.setState({
				['open' + expNum]: false
			});
		}

		getExpandableLabel = (expNum, value, index) => {
			switch (expNum) {
				case 1:
					return value;
				case 2:
					return t.emoticons[value];
				default:
					return index;
			}
		}

		handleChange = (expNum) => ({value, index}) => {
			const label = this.getExpandableLabel(expNum, value, index);
			this.setState({
				['label' + expNum]: label,
				['value' + expNum]: value,
				lastIndex: index,
				lastLabel: label,
				lastValue: value
			});
		}

		newIncrementChangeHandler = (val) => {
			this.setState({
				newIncrementVal: val
			});
		}

		render = () => (
			React.createElement(
				t.div,
				{ className: this.props.className + ' ' + t.css.app },
				React.createElement(
					t.Panel,
					null,
					React.createElement(t.Header, { title: 'Kitchensink', type: 'compact' }),
					React.createElement(
						t.div,
						{ className: t.css.mainDiv },
						React.createElement(
							t.Divider,
							null,
							'Button'
						),
						React.createElement(
							t.Button,
							null,
							'Easy'
						),
						React.createElement(
							t.Button,
							{ backgroundOpacity: 'translucent' },
							'Medium'
						),
						React.createElement(
							t.Button,
							{ backgroundOpacity: 'transparent' },
							'Hard'
						),
						React.createElement(
							t.Divider,
							null,
							'Checkbox Item group'
						),
						React.createElement(
							t.StatefulCheckboxItem,
							{ onToggle: this.handleToggle },
							'Raspberry'
						),
						React.createElement(
							t.StatefulCheckboxItem,
							{ checked: true, onToggle: this.handleToggle },
							'Blackberry'
						),
						React.createElement(
							t.StatefulCheckboxItem,
							{ onToggle: this.handleToggle },
							'Strawberry'
						),
						React.createElement(
							t.Divider,
							null,
							'ExpandableList'
						),
						React.createElement(
							t.ExpandableList,
							{
								title: 'Values from Items',
								label: this.state.label1,
								value: this.state.value1,
								noneText: 'Item 1',
								open: this.state.open1,
								onOpen: this.handleOpen1,
								onClose: this.handleClose1,
								onSelect: this.handleChange1
							},
							['Item 1', 'Item 2', 'Item 3']
						),
						React.createElement(
							t.Divider,
							null,
							'ExpandablePicker'
						),
						React.createElement(
							t.ExpandablePicker,
							{
								title: 'Favorite Emoji',
								label: this.state.label2,
								value: this.state.value2,
								noneText: 'I have no favorites',
								open: this.state.open2,
								onOpen: this.handleOpen2,
								onClose: this.handleClose2,
								onChange: this.handleChange2,
								width: 'large'
							},
							t.emoticons
						),
						React.createElement(
							t.Divider,
							null,
							'Icon'
						),
						React.createElement(
							t.Icon,
							null,
							'flag'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'flag'
						),
						React.createElement(
							t.Icon,
							null,
							'lock'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'lock'
						),
						React.createElement(
							t.Icon,
							null,
							'bulletlist'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'bulletlist'
						),
						React.createElement(
							t.Icon,
							null,
							'play'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'play'
						),
						React.createElement(
							t.Icon,
							null,
							'check'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'check'
						),
						React.createElement(
							t.Icon,
							null,
							'search'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'search'
						),
						React.createElement(
							t.Icon,
							null,
							'rollforward'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'rollforward'
						),
						React.createElement(
							t.Icon,
							null,
							'drawer'
						),
						React.createElement(
							t.Icon,
							{ small: true },
							'drawer'
						),
						React.createElement(
							t.Divider,
							null,
							'IconButton'
						),
						React.createElement(
							t.IconButton,
							null,
							'flag'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'flag'
						),
						React.createElement(
							t.IconButton,
							null,
							'lock'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'lock'
						),
						React.createElement(
							t.IconButton,
							null,
							'bulletlist'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'bulletlist'
						),
						React.createElement(
							t.IconButton,
							null,
							'play'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'play'
						),
						React.createElement(
							t.IconButton,
							null,
							'check'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'check'
						),
						React.createElement(
							t.IconButton,
							null,
							'search'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'search'
						),
						React.createElement(
							t.IconButton,
							null,
							'rollforward'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'rollforward'
						),
						React.createElement(
							t.IconButton,
							null,
							'drawer'
						),
						React.createElement(
							t.IconButton,
							{ small: true },
							'drawer'
						),
						React.createElement(
							t.Divider,
							null,
							'Input'
						),
						React.createElement(
							t.div,
							null,
							React.createElement(t.StatefulInput, { placeholder: 'Enter something', value: this.state.inputValue, onChange: this.updateInput, iconEnd: 'search' }),
							React.createElement(t.StatefulInput, { placeholder: 'Enter Something', iconEnd: 'search', disabled: true })
						),
						React.createElement(
							t.Divider,
							null,
							'Item'
						),
						React.createElement(
							t.div,
							null,
							React.createElement(
								t.Item,
								null,
								'Item 1'
							),
							React.createElement(
								t.Item,
								{ disabled: true },
								'Item 2 (Disabled)'
							),
							React.createElement(
								t.Item,
								null,
								'Item 3'
							),
							React.createElement(
								t.Item,
								null,
								'Item 4'
							)
						),
						React.createElement(
							t.Divider,
							null,
							'Labeled Item'
						),
						React.createElement(
							t.LabeledItem,
							{ label: 'A label for this LabeledItem 1' },
							'LabeledItem 1'
						),
						React.createElement(
							t.LabeledItem,
							{ label: 'A label for this LabeledItem 2' },
							'LabeledItem 2'
						),
						React.createElement(
							t.LabeledItem,
							{ label: 'A label for this LabeledItem 3' },
							'LabeledItem 3'
						),
						React.createElement(
							t.Divider,
							null,
							'Radio Item'
						),
						React.createElement(
							t.StatefulRadioItem,
							{ inline: true, checked: true, onToggle: this.handleToggle },
							' Cat '
						),
						React.createElement(
							t.StatefulRadioItem,
							{ inline: true, onToggle: this.handleToggle },
							' Dog '
						),
						React.createElement(
							t.StatefulRadioItem,
							{ inline: true, onToggle: this.handleToggle },
							' Whale '
						),
						React.createElement(
							t.StatefulRadioItem,
							{ inline: true, onToggle: this.handleToggle },
							' Cow '
						),
						React.createElement(
							t.Divider,
							null,
							'Picker'
						),
						React.createElement(
							t.StatefulPicker,
							{ defaultValue: 2 },
							['Hotmail', 'GMail', 'Yahoo Mail', 'AOL Mail', 'Custom IMAP']
						),
						React.createElement(
							t.Divider,
							null,
							'Progress Bars'
						),
						React.createElement(t.ProgressBar, { progress: 25 }),
						React.createElement(
							t.Divider,
							null,
							'Range Picker'
						),
						React.createElement(t.StatefulRangePicker, { min: -10, max: 10, defaultValue: 3, orientation: 'vertical' }),
						React.createElement(
							t.Divider,
							null,
							'Selectable Items'
						),
						React.createElement(
							t.StatefulSelectableItem,
							{ checked: true, onToggle: this.handleToggle },
							' SelectableItem 1'
						),
						React.createElement(
							t.StatefulSelectableItem,
							{ onToggle: this.handleToggle },
							' SelectableItem 2'
						),
						React.createElement(
							t.StatefulSelectableItem,
							{ disabled: true, onToggle: this.handleToggle },
							'SelectableItem 3 (Disabled)'
						),
						React.createElement(
							t.StatefulSelectableItem,
							{ onToggle: this.handleToggle },
							' SelectableItem 4 '
						),
						React.createElement(
							t.StatefulSelectableItem,
							{ onToggle: this.handleToggle },
							' SelectableItem 5 '
						),
						React.createElement(
							t.Divider,
							null,
							'Slider '
						),
						React.createElement(t.Slider, { min: 0, max: 100, value: 25, step: 1, backgroundPercent: 35 }),
						React.createElement(t.IncrementSlider, { min: 0, max: 100, value: 25, step: 1, backgroundPercent: 35 }),
						React.createElement(
							t.Divider,
							null,
							'Toggle Button '
						),
						React.createElement(
							t.ToggleButton,
							null,
							'Button1'
						),
						React.createElement(
							t.ToggleButton,
							null,
							'Button2'
						),
						React.createElement(
							t.ToggleButton,
							null,
							'Button3'
						),
						React.createElement(
							t.ToggleButton,
							{ disabled: true },
							'Button4 (Disabled)'
						),
						React.createElement(
							t.Divider,
							null,
							'Toggle Items'
						),
						React.createElement(
							t.SwitchItem,
							{ checked: true },
							'Option 1'
						),
						React.createElement(
							t.SwitchItem,
							null,
							'Option 2'
						),
						React.createElement(
							t.SwitchItem,
							{ disabled: true },
							'Option 3'
						),
						React.createElement(
							t.SwitchItem,
							null,
							'Option 4'
						),
						React.createElement(
							t.SwitchItem,
							{ checked: true },
							'Option 5'
						)
					)
				)
			)
		)
	};
};

export default ES6;
