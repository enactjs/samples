import React from 'react';
import kind from '@enact/core/kind';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import {connect} from 'react-redux';
import {selectItem} from '../../actions/';

const ChannelItem = kind({
	name: 'ChannelItem',

	propTypes: {
		channelNumber: React.PropTypes.string,
		dataIndex: React.PropTypes.string,
		locked: React.PropTypes.bool,
		selectChannel: React.PropTypes.func,
		selected: React.PropTypes.bool
	},
	computed: {
		content: ({locked, channelNumber}) => locked ? `${channelNumber} LOCKED` : `${channelNumber}`
	},
	render: ({content, selectChannel, selected, ...rest}) => {
		delete rest.dataIndex;
		delete rest.locked;
		delete rest.channelNumber;

		return (
			<CheckboxItem {...rest} onClick={selectChannel} selected={selected}>
				{`Channel ${content}`}
			</CheckboxItem>
		);
	}
});

const mapStateToProps = ({channels}, {dataIndex}) => ({
	selected: channels.channels[dataIndex].selected,
	locked: channels.channels[dataIndex].locked,
	channelNumber: channels.channels[dataIndex].channelNumber
});


const mapDispatchToProps = (dispatch, {dataIndex}) => {
	return {
		selectChannel: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);
