import React from 'react';
import {Panel, Header} from '@enact/moonstone/Panels';
import LazilyLoad, {importLazy} from '../components/LazilyLoad';

export default class extends React.Component {
	render () {
		const {onClick, ...rest} = this.props;

		return(
			<Panel {...rest}>
				<Header title='Close Popup' />
					<LazilyLoad modules={{
						Button: () => importLazy(import('@enact/moonstone/Button')),
						Picker: () => importLazy(import('@enact/moonstone/Picker'))
					}}>
						{({Picker, Button}) => (
							<div>
							<Button onClick={onClick} />
							<Picker>
								{['a', 'b', 'c']}
							</Picker>
							<Picker>
								{['a', 'b', 'c']}
							</Picker>
							<Picker>
								{['a', 'b', 'c']}
							</Picker>
							<Picker>
								{['a', 'b', 'c']}
							</Picker>
							</div>
						)}
					</LazilyLoad>
			</Panel>
		);
	}
}