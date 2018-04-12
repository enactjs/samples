import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/moonstone/VirtualList';

import ImageItem from '../ImageItem';

class ImageList extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array
	}

	renderItem = ({...rest}) => (<ImageItem {...rest} />)

	render = () => {
		const
			rest = Object.assign({}, this.props),
			{imageitems} = this.props;

		delete rest.dispatch;
		delete rest.imageitems;

		return (
			<VirtualGridList
				{...rest}
				dataSize={imageitems.length}
				itemRenderer={this.renderItem}
				itemSize={{minHeight: ri.scale(270), minWidth: ri.scale(180)}}
				spacing={ri.scale(21)}
			/>
		);
	}
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
