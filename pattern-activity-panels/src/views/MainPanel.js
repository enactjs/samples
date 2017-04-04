import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import ItemPure from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';
import pure from 'recompose/pure';
// const ItemPure = pure(Item);

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({title, onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
				<Button onClick={onClick}>Click me</Button>
			</Header>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			<ItemPure onClick={onClick}>Click me</ItemPure>
			
		</Panel>
	)
});

export default MainPanel;
