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
};

const renderComponent = ({data, index, key}) => {
	return (<ChannelItem key={key} dataIndex={data[index]} />);
};

renderComponent.propTypes = {
	data: React.PropTypes.array,
	index: React.PropTypes.number,
	key: React.PropTypes.number
};

const ChannelList = kind({
	name: 'ChannelList',

	propTypes: {
		channels: React.PropTypes.array,
		dispatch: React.PropTypes.func
	},
	render: ({channels, ...rest}) => {
		delete rest.dispatch;

		return (
			<VirtualList
				{...rest}
				data={channels}
				dataSize={channels.length}
				direction="vertical"
				itemSize={ri.scale(72)}
				spacing={ri.scale(0)}
				style={style.listHeight}
				component={renderComponent}
			/>
		);

	}
});

const mapStateToProps = ({channels}) => ({
	channels: channels.channelsOrder
});

export default connect(mapStateToProps)(ChannelList);