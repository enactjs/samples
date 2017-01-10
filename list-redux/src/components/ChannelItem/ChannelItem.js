import React from 'react';
import kind from '@enact/core/kind';
import CheckboxItem from '@enact/moonstone/CheckboxItem';
import {connect} from 'react-redux';
import {selectItem} from '../../actions/';

const ChannelItem = kind({
	name: 'ChannelItem',
	computed: {
		content: ({data}) => data.favorite ? `${data.name} LOCKED` : `${data.name}`
	},
	render: ({content, data, selectChannel, ...rest}) => {
		delete rest.dataIndex
		return (
			<div {...rest}>
				<CheckboxItem onClick={selectChannel} selected={data.selected}>
					{content}
				</CheckboxItem>
			</div>
		)
	}
});

const mapStateToProps = ({channels}, {dataIndex}) => ({
	data: channels.channels[dataIndex]
});

const mapDispatchToProps = (dispatch, {dataIndex}) => {
	return {
		selectChannel: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelItem);