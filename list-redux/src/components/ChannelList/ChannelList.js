import React from 'react';
import {connect} from 'react-redux';

import ri from '@enact/ui/resolution';
import kind from '@enact/core/kind';
import {VirtualList} from '@enact/moonstone/VirtualList';
import ChannelItem from '../ChannelItem';

const style = {
	item: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		padding: '0 0 ' + ri.scale(96) + 'px 0',
		margin: '0',
		border: ri.scale(6) + 'px solid transparent',
		boxSizing: 'border-box',

		color: '#fff'
	},
	listHeight: {
		height: ri.scale(550) + 'px'
	}
}

const renderComponent = ({data, index, key}) => {
	return (<ChannelItem key={key} dataIndex={data[index]} />)
}

const ChannelList = kind({
	name: 'ChannelList',
	render: ({...rest}) => {
	return (
		<div>
			<VirtualList
				data={rest.channels.channelsOrder}
				dataSize={rest.channels.channelsOrder.length}
				direction="vertical"
				itemSize={ri.scale(48)}
				spacing={ri.scale(0)}
				style={style.listHeight}
				component={renderComponent}
			/>
		</div>
	)}
});

const mapStateToProps = ({channels}) => ({
	channels
});

export default connect(mapStateToProps)(ChannelList);