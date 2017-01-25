import React from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import {VirtualGridList} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';

import ImageItem from '../ImageItem';

const renderComponent = ({data, index, key}) => {
	return <ImageItem key={key} dataIndex={data[index]} />;
};

renderComponent.propTypes = {
	data: React.PropTypes.array,
	index: React.PropTypes.number,
	key: React.PropTypes.number
};

const ImageList = kind({
	name: 'ImageList',

	propTypes: {
		imageitems: React.PropTypes.array,
		dispatch: React.PropTypes.func
	},
	render: ({imageitems, ...rest}) => {
		delete rest.dispatch;

		return (
			<VirtualGridList
				{...rest}
				component={renderComponent}
				data={imageitems}
				dataSize={imageitems.length}
				direction="vertical"
				itemSize={{minWidth: ri.scale(180), minHeight: ri.scale(270)}}
				spacing={ri.scale(21)}
			/>
		);

	}
});

const mapStateToProps = ({datas}) => ({
	imageitems: datas.datasOrder
});

export default connect(mapStateToProps)(ImageList);
