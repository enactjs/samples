import {connect} from 'react-redux';
import ri from '@enact/ui/resolution';
import React from 'react';
import PropTypes from 'prop-types';
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
				component={this.renderItem}
				data={imageitems}
				dataSize={imageitems.length}
				direction='horizontal'
				focusableScrollbar
				itemSize={{minHeight: ri.scale(500), minWidth: ri.scale(400)}}
			/>
		);
	}
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
