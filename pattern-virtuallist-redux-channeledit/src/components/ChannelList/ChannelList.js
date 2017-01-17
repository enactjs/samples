import React from 'react';
import {connect} from 'react-redux';

import ri from '@enact/ui/resolution';
import kind from '@enact/core/kind';
import {VirtualList} from '@enact/moonstone/VirtualList';
import ChannelItem from '../ChannelItem';

const renderComponent = ({data, index, key}) => {
	return <ChannelItem key={key} dataIndex={data[index]} />;
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
				itemSize={60}
				component={renderComponent}
			/>
		);

	}
});

const mapStateToProps = ({channels}) => ({
	channels: channels.channelsOrder
});

export default connect(mapStateToProps)(ChannelList);
