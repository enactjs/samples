import kind from '@enact/core/kind';
import IconButton from '@enact/moonstone/IconButton';
import Button from '@enact/moonstone/Button';
import Slider from '@enact/moonstone/Slider';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

const themeStack = ['moonstone', 'aqua', 'car', 'material'];
let themeIndex = 0;

const onClickThemeButton = ({onSelectTheme}) => (/* ev */) => {
	themeIndex++;
	const nextTheme = themeStack[themeIndex % themeStack.length];
	return onSelectTheme({theme: nextTheme});
};

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		onSelectTheme: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	computed: {
		themePicker: onClickThemeButton
	},

	render: ({title, onClick, themePicker, ...rest}) => {
		delete rest.onSelectTheme;
		return (
			<Panel {...rest}>
				<Header title={title} preserveCase>
					<IconButton preserveCase onClick={onClick}>gear</IconButton>
					<Button preserveCase onClick={onClick}>Click me</Button>
					<Button preserveCase onClick={onClick}>Click me</Button>
					<Button preserveCase onClick={themePicker}>Change Theme!</Button>
				</Header>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Slider defaultValue={25} />
			</Panel>
		);
	}
});

export default MainPanel;
