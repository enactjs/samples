import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';
import ToggleButton from '@enact/moonstone/ToggleButton';
import {LunaObserver} from '@enact/webos/luna';
import React, {Component} from 'react';



class MainPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'Toggle "Observe" to start observing the luna service via subscription.'
		};
		this.myObserver = new LunaObserver(record => {
			this.setState({status: 'Record Received:\n\n' + JSON.stringify(record, null, '\t')});
		});
	}

	toggleObserver = ({selected}) => {
		if (selected) {
			this.setState({status: 'Starting service subscription observing...'});
			this.myObserver.observe('com.webos.applicationManager/listApps');
		} else {
			this.myObserver.disconnect();
			this.setState({status: 'Stopped service subscription observing.'});
		}
	}

	render() {
		return (
			<Panel {...this.props}>
				<Header title="Observer-style LunaObserver Example" />
				<ToggleButton toggleOnLabel="Disconnect" toggleOffLabel="Observe" onToggle={this.toggleObserver}/>
				<Scroller>
					<pre>{this.state.status}</pre>
				</Scroller>
			</Panel>
		)
	}

}

export default MainPanel;
