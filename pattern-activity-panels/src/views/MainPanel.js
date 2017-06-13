import kind from '@enact/core/kind';
import IconButton from '@enact/moonstone/IconButton';
import Button from '@enact/moonstone/Button';
import Slider from '@enact/moonstone/Slider';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import Input from '@enact/moonstone/Input';
import React from 'react';
import PropTypes from 'prop-types';

const themeStack = ['dark', 'light', 'aqua', 'car', 'material'];
let themeIndex = 0;

const onClickSkinButton = ({onSelectSkin}) => (/* ev */) => {
	themeIndex++;
	const nextSkin = themeStack[themeIndex % themeStack.length];
	return onSelectSkin({skin: nextSkin});
};

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		onSelectSkin: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	computed: {
		skinPicker: onClickSkinButton
	},

	render: ({title, onClick, skinPicker, ...rest}) => {
		delete rest.onSelectSkin;
		return (
			<Panel {...rest}>
				<Header title={title} casing="preserve">
					<IconButton casing="preserve" onClick={onClick}>gear</IconButton>
					<Button casing="preserve" onClick={onClick}>Click me</Button>
					<Button casing="preserve" onClick={onClick}>Click me</Button>
					<Button casing="preserve" onClick={skinPicker}>Change Skin!</Button>
				</Header>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Item onClick={onClick}>Click me</Item>
				<Input placeholder="some text that's real long">Click me</Input>
				<Slider defaultValue={25} />
			</Panel>
		);
	}
});

export default MainPanel;
