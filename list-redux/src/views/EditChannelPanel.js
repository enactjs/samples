import React from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import {saveItems, unsaveItems} from '../actions/';
import ChannelList from '../components/ChannelList';

const EditChannelPanel = kind({
	name: 'EditChannelPanel',

	render: ({saveChannels, unsaveChannels, ...rest}) => (
		<Panel {...rest}>
			<Header title="Edit All Channels">
				<Button onClick={saveChannels}>Favorite</Button>
				<Button onClick={unsaveChannels}>Unfavorite</Button>
			</Header>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div style={{flex: '1'}}>
					<ChannelList/>
				</div>
			</div>
		</Panel>
	)
});

const mapDispatchToProps = (dispatch) => {
	return {
		saveChannels: () => dispatch(saveItems()),
		unsaveChannels: () => dispatch(unsaveItems())
	};
};


export default connect(null, mapDispatchToProps)(EditChannelPanel);