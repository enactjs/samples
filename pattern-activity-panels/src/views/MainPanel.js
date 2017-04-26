import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Picker from '@enact/moonstone/Picker';


let a = [];
for (let index = 0; index < 100; index++) {
	a.push(`${index}`);
}

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
			<ExpandableList
				title="List of things"
			>
				{a}
			</ExpandableList>
			<ExpandableList
				title="List of things"
			>
				{a}
			</ExpandableList>
			<ExpandableList
				title="List of things"
			>
				{a}
			</ExpandableList>
			<Picker>
				{a}
			</Picker>
			<Picker>
				{a}
			</Picker>
			<Picker>
				{a}
			</Picker>

		</Panel>
	)
});

export default MainPanel;
