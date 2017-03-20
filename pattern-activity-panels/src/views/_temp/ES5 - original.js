var ES5 = function ES5(comp) {
	var _class, _temp;

	var t = {
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
	var React = t.React;

	return _temp = _class = function (_React$Component) {
		_inherits(App, _React$Component);

		function App(props) {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

			_this.updateInput = function (e) {
				return _this.setState({ inputValue: e.value });
			};

			_this.headerClickHandler = function (expNum) {
				return function () {
					_this.setState(_defineProperty({}, 'open' + expNum, !_this.state['open' + expNum]));
				};
			};

			_this.handleToggle = function (_ref) {
				var checked = _ref.checked,
				    value = _ref.value;

				_this.setState({
					lastChecked: checked,
					lastValue: value
				});
			};

			_this.handleOpen = function (expNum) {
				return function () {
					_this.setState(_defineProperty({}, 'open' + expNum, true));
				};
			};

			_this.handleClose = function (expNum) {
				return function () {
					_this.setState(_defineProperty({}, 'open' + expNum, false));
				};
			};

			_this.getExpandableLabel = function (expNum, value, index) {
				switch (expNum) {
					case 1:
						return value;
					case 2:
						return t.emoticons[value];
					default:
						return index;
				}
			};

			_this.handleChange = function (expNum) {
				return function (_ref2) {
					var _this$setState4;

					var value = _ref2.value,
					    index = _ref2.index;

					var label = _this.getExpandableLabel(expNum, value, index);
					_this.setState((_this$setState4 = {}, _defineProperty(_this$setState4, 'label' + expNum, label), _defineProperty(_this$setState4, 'value' + expNum, value), _defineProperty(_this$setState4, 'lastIndex', index), _defineProperty(_this$setState4, 'lastLabel', label), _defineProperty(_this$setState4, 'lastValue', value), _this$setState4));
				};
			};

			_this.newIncrementChangeHandler = function (val) {
				_this.setState({
					newIncrementVal: val
				});
			};

			_this.render = function () {
				return React.createElement(
					t.div,
					{ className: _this.props.className + ' ' + t.css.app },
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
								{ onToggle: _this.handleToggle },
								'Raspberry'
							),
							React.createElement(
								t.StatefulCheckboxItem,
								{ checked: true, onToggle: _this.handleToggle },
								'Blackberry'
							),
							React.createElement(
								t.StatefulCheckboxItem,
								{ onToggle: _this.handleToggle },
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
									label: _this.state.label1,
									value: _this.state.value1,
									noneText: 'Item 1',
									open: _this.state.open1,
									onOpen: _this.handleOpen1,
									onClose: _this.handleClose1,
									onSelect: _this.handleChange1
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
									label: _this.state.label2,
									value: _this.state.value2,
									noneText: 'I have no favorites',
									open: _this.state.open2,
									onOpen: _this.handleOpen2,
									onClose: _this.handleClose2,
									onChange: _this.handleChange2,
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
								React.createElement(t.StatefulInput, { placeholder: 'Enter something', value: _this.state.inputValue, onChange: _this.updateInput, iconEnd: 'search' }),
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
								{ inline: true, checked: true, onToggle: _this.handleToggle },
								' Cat '
							),
							React.createElement(
								t.StatefulRadioItem,
								{ inline: true, onToggle: _this.handleToggle },
								' Dog '
							),
							React.createElement(
								t.StatefulRadioItem,
								{ inline: true, onToggle: _this.handleToggle },
								' Whale '
							),
							React.createElement(
								t.StatefulRadioItem,
								{ inline: true, onToggle: _this.handleToggle },
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
								{ checked: true, onToggle: _this.handleToggle },
								' SelectableItem 1'
							),
							React.createElement(
								t.StatefulSelectableItem,
								{ onToggle: _this.handleToggle },
								' SelectableItem 2'
							),
							React.createElement(
								t.StatefulSelectableItem,
								{ disabled: true, onToggle: _this.handleToggle },
								'SelectableItem 3 (Disabled)'
							),
							React.createElement(
								t.StatefulSelectableItem,
								{ onToggle: _this.handleToggle },
								' SelectableItem 4 '
							),
							React.createElement(
								t.StatefulSelectableItem,
								{ onToggle: _this.handleToggle },
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
				);
			};

			_this.state = {
				index: 0,
				open1: false,
				value1: 'Item 1',
				label1: 'Item 1',
				open2: false,
				value2: 2,
				label2: t.emoticons[2],
				inputValue: ''
			};
			_this.handleOpen1 = _this.handleOpen(1);
			_this.handleOpen2 = _this.handleOpen(2);
			_this.handleClose1 = _this.handleClose(1);
			_this.handleClose2 = _this.handleClose(2);
			_this.handleChange1 = _this.handleChange(1);
			_this.handleChange2 = _this.handleChange(2);
			return _this;
		}

		return App;
	}(React.Component), _class.propTypes = {
		className: React.PropTypes.string
	}, _temp;
};

exports.default = ES5;
