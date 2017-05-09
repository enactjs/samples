import React from 'react';
import Item from '@enact/moonstone/Item';

class SampleItem extends React.Component {
	constructor(props) {
		super(props)
	}

	itemSelect = () => {
		this.props.history.push({pathname: this.props.path});
	}

	render () {
		const {children, rest} = this.props;

		return (
			<Item {...rest} onClick={this.itemSelect}>
				{children}
			</Item>
		)
	}
}

export default SampleItem;