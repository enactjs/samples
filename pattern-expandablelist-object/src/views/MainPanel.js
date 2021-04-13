import ExpandableList from '@enact/moonstone/ExpandableList';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * The title to display in the header.
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: (props) => (
		<Panel {...props}>
			<Header title={props.title} />
			<ExpandableList
				noneText={'nothing selected'}
				select={'multiple'}
				title={'ExpandableList with Data in Object format'}
			>
				{[
					{disabled: false, children: 'option1', key: 'option1'},
					{disabled: false, children: 'option2', key: 'option2'},
					{disabled: true, children: 'option3', key: 'option3'}
				]}
			</ExpandableList>
		</Panel>
	)
});

export default MainPanel;
