import React, {PropTypes} from 'react';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
let a = [];

for (let i = 0; i < 50; i++) {
	a.push(`${i}`);
}

class ItemPanel extends React.Component {
	render () {
		const {title, onClick, ...rest} = this.props;

		return (
			<Panel {...rest}>
				<Header title={title} />
				<Button onClick={onClick}>Click</Button>
				<ExpandableList
					title="Listings"
				>
					{a}
				</ExpandableList>

			</Panel>
		);
	}
}

export default ItemPanel;
