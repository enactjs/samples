import React from 'react';
import {Panel, Header} from '@enact/moonstone/Panels';
import LazilyLoad, {importLazy} from '../components/LazilyLoad';

export default class extends React.Component {
	render () {
		const {onClick, ...rest} = this.props;
		return(
			<Panel >
				<Header title='Close Popup' />
					<LazilyLoad modules={{
						Button: () => importLazy(import('@enact/moonstone/Button')),
						Item: () => importLazy(import('@enact/moonstone/Item'))
					}}>
						{({Item, Button}) => (
							<div>
								<Button onClick={this.props.onClick}>A</Button>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
								<Item>Item</Item>
							</div>
						)}
					</LazilyLoad>
			</Panel>
		);
	}
}