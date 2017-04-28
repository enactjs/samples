import React from 'react';
import {Panel, Header} from '@enact/moonstone/Panels';
import LazilyLoad, {importLazy} from '../components/LazilyLoad';

export default class extends React.Component {
	render () {
		return(
				<Panel>
					<Header title='Close Popup' />
						<LazilyLoad modules={{
							Item: () => importLazy(import('@enact/moonstone/Item'))
						}}>
							{({Item}) => (
								<Item>Item</Item>
							)}
						</LazilyLoad>
				</Panel>
		);
	}
}