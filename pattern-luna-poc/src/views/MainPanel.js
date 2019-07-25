import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import luna from '@enact/webos/luna';
import React, {Component} from 'react';

class MainPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'Service request pending...'
		};
	}

	componentDidMount () {
		luna('com.webos.applicationManager/listApps')
			.then(res => {
				console.log(res);
				this.setState({status: 'SUCCESS:\n\n' + JSON.stringify(res, null, '\t')});
			})
			.catch(err => {
				this.setState({status: 'FAILURE:\n\n' + JSON.stringify(err, null, '\t')});
			})
			.finally(res => {
				console.log(res);
			});
	}

	render() {
		return (
			<Panel {...this.props}>
				<Header title="Promise-based luna() Example" />
				<Scroller>
					<pre>{this.state.status}</pre>
				</Scroller>
			</Panel>
		)
	}

}

export default MainPanel;
