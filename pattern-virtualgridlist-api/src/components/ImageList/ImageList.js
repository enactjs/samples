import {connect} from 'react-redux';
import ri from '@enact/ui/resolution';
import React, {PropTypes} from 'react';
import {VirtualGridList} from '@enact/moonstone/VirtualList';

import ImageItem from '../ImageItem';

class ImageList extends React.Component {
	static propTypes = {
		imageitems: PropTypes.array,
		dispatch: PropTypes.func
	}

	renderItem = ({data, index, ...rest}) => {
		return (
			<ImageItem
				dataIndex={data[index]}
				{...rest}
			/>
		);
	}

	render = () => {
		const
			rest = Object.assign({}, this.props),
			{imageitems} = this.props;

		delete rest.dispatch;
		delete rest.imageitems;

		return (
			<VirtualGridList
				{...rest}
				component={this.renderItem}
				data={imageitems}
				dataSize={imageitems.length}
				itemSize={{minWidth: ri.scale(180), minHeight: ri.scale(270)}}
				spacing={ri.scale(21)}
			/>
		);

	}
}

const mapStateToProps = ({datas}) => ({
	imageitems: datas.datasOrder
});

export default connect(mapStateToProps)(ImageList);
