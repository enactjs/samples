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
							ExpandablePicker: () => importLazy(import('@enact/moonstone/ExpandablePicker'))
						}}>
							{({ExpandablePicker, Button}) => (
								<div>
									<Button onClick={onClick}></Button>
									<ExpandablePicker
										title="a"
									>
										{['a', 'b', 'c']}
									</ExpandablePicker>
									<ExpandablePicker
										title="a"
									>
										{['a', 'b', 'c']}
									</ExpandablePicker>
									<ExpandablePicker
										title="a"
									>
										{['a', 'b', 'c']}
									</ExpandablePicker>
									<ExpandablePicker
										title="a"
									>
										{['a', 'b', 'c']}
									</ExpandablePicker>
								</div>
							)}
						</LazilyLoad>
				</Panel>
		);
	}
}