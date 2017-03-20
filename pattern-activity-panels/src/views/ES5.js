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
		Scroller: comp.Scroller,
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
			/*
			this.handleOpen1 = this.handleOpen(1);
			this.handleOpen2 = this.handleOpen(2);
			this.handleClose1 = this.handleClose(1);
			this.handleClose2 = this.handleClose(2);
			this.handleChange1 = this.handleChange(1);
			this.handleChange2 = this.handleChange(2);
			*/
		}

		/*
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
		*/

		render = () => (
			<t.div className={this.props.className + ' ' + t.css.app}>
				<t.Panel>
					<t.Scroller className={t.css.mainDiv}>
						<t.Divider>Button</t.Divider>
						<t.Button>Easy</t.Button>
						<t.Button backgroundOpacity="translucent">Medium</t.Button>
						<t.Button backgroundOpacity="transparent">Hard</t.Button>
						<t.Divider>Checkbox Item group</t.Divider>
						<t.StatefulCheckboxItem onToggle={this.handleToggle}>Raspberry</t.StatefulCheckboxItem>
						<t.StatefulCheckboxItem checked onToggle={this.handleToggle}>Blackberry</t.StatefulCheckboxItem>
						<t.StatefulCheckboxItem onToggle={this.handleToggle}>Strawberry</t.StatefulCheckboxItem>
						<t.Divider>ExpandableList</t.Divider>
						<t.ExpandableList
							title='Values from Items'
							label={this.state.label1}
							value={this.state.value1}
							noneText='Item 1'
							open={this.state.open1}
							onOpen={this.handleOpen1}
							onClose={this.handleClose1}
							onSelect={this.handleChange1}
						>
							{['Item 1', 'Item 2', 'Item 3']}
						</t.ExpandableList>
						<t.Divider>ExpandablePicker</t.Divider>
						<t.ExpandablePicker
							title="Favorite Emoji"
							label={this.state.label2}
							value={this.state.value2}
							noneText="I have no favorites"
							open={this.state.open2}
							onOpen={this.handleOpen2}
							onClose={this.handleClose2}
							onChange={this.handleChange2}
							width="large"
						>
							{t.emoticons}
						</t.ExpandablePicker>
						<t.Divider>Icon</t.Divider>
						<t.Icon>flag</t.Icon>
						<t.Icon small>flag</t.Icon>
						<t.Icon>lock</t.Icon>
						<t.Icon small>lock</t.Icon>
						<t.Icon>bulletlist</t.Icon>
						<t.Icon small>bulletlist</t.Icon>
						<t.Icon>play</t.Icon>
						<t.Icon small>play</t.Icon>
						<t.Icon>check</t.Icon>
						<t.Icon small>check</t.Icon>
						<t.Icon>search</t.Icon>
						<t.Icon small>search</t.Icon>
						<t.Icon>rollforward</t.Icon>
						<t.Icon small>rollforward</t.Icon>
						<t.Icon>drawer</t.Icon>
						<t.Icon small>drawer</t.Icon>
						<t.Divider>IconButton</t.Divider>
						<t.IconButton>flag</t.IconButton>
						<t.IconButton small>flag</t.IconButton>
						<t.IconButton>lock</t.IconButton>
						<t.IconButton small>lock</t.IconButton>
						<t.IconButton>bulletlist</t.IconButton>
						<t.IconButton small>bulletlist</t.IconButton>
						<t.IconButton>play</t.IconButton>
						<t.IconButton small>play</t.IconButton>
						<t.IconButton>check</t.IconButton>
						<t.IconButton small>check</t.IconButton>
						<t.IconButton>search</t.IconButton>
						<t.IconButton small>search</t.IconButton>
						<t.IconButton>rollforward</t.IconButton>
						<t.IconButton small>rollforward</t.IconButton>
						<t.IconButton>drawer</t.IconButton>
						<t.IconButton small>drawer</t.IconButton>
						<t.Divider>Input</t.Divider>
						<t.div>
							<t.StatefulInput placeholder="Enter something" value={this.state.inputValue} onChange={this.updateInput} />
							<t.StatefulInput placeholder="Enter Something" disabled />
						</t.div>
						<t.Divider>Item</t.Divider>
						<t.div>
							<t.Item>Item 1</t.Item>
							<t.Item disabled>Item 2 (Disabled)</t.Item>
							<t.Item>Item 3</t.Item>
							<t.Item>Item 4</t.Item>
						</t.div>
						<t.Divider>Labeled Item</t.Divider>
						<t.LabeledItem label="A label for this LabeledItem 1">LabeledItem 1</t.LabeledItem>
						<t.LabeledItem label="A label for this LabeledItem 2">LabeledItem 2</t.LabeledItem>
						<t.LabeledItem label="A label for this LabeledItem 3">LabeledItem 3</t.LabeledItem>
						<t.Divider>Radio Item</t.Divider>
						<t.StatefulRadioItem inline checked onToggle={this.handleToggle}> Cat </t.StatefulRadioItem>
						<t.StatefulRadioItem inline onToggle={this.handleToggle}> Dog </t.StatefulRadioItem>
						<t.StatefulRadioItem inline onToggle={this.handleToggle}> Whale </t.StatefulRadioItem>
						<t.StatefulRadioItem inline onToggle={this.handleToggle}> Cow </t.StatefulRadioItem>
						<t.Divider>Picker</t.Divider>
						<t.StatefulPicker defaultValue={2}>
							{['Hotmail', 'GMail', 'Yahoo Mail', 'AOL Mail', 'Custom IMAP']}
						</t.StatefulPicker>
						<t.Divider>Range Picker</t.Divider>
						<t.StatefulRangePicker min={-10} max={10} defaultValue={3} orientation="vertical" />
						<t.Divider>Selectable Items</t.Divider>
						<t.StatefulSelectableItem checked onToggle={this.handleToggle}> SelectableItem 1</t.StatefulSelectableItem>
						<t.StatefulSelectableItem onToggle={this.handleToggle}> SelectableItem 2</t.StatefulSelectableItem>
						<t.StatefulSelectableItem disabled onToggle={this.handleToggle}>SelectableItem 3 (Disabled)</t.StatefulSelectableItem>
						<t.StatefulSelectableItem onToggle={this.handleToggle}> SelectableItem 4 </t.StatefulSelectableItem>
						<t.StatefulSelectableItem onToggle={this.handleToggle}> SelectableItem 5 </t.StatefulSelectableItem>
						<t.Divider>Slider </t.Divider>
						<t.Slider min={0} max={100} value={25} step={1} />
						<t.IncrementSlider min={0} max={100} value={25} step={1} />
						<t.Divider>Toggle Items</t.Divider>
						<t.SwitchItem checked >Option 1</t.SwitchItem>
						<t.SwitchItem >Option 2</t.SwitchItem>
						<t.SwitchItem disabled >Option 3</t.SwitchItem>
						<t.SwitchItem >Option 4</t.SwitchItem>
						<t.SwitchItem checked >Option 5</t.SwitchItem>
					</t.Scroller>
				</t.Panel>
			</t.div>
		)
	}
};

export default ES6;
