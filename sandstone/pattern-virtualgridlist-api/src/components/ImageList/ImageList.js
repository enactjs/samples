import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connect} from 'react-redux';

import ImageItem from '../ImageItem';

class ImageList extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array
	};

	renderItem = ({...rest}) => (<ImageItem {...rest} />);

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
				itemSize={{minHeight: ri.scale(540), minWidth: ri.scale(360)}}
				spacing={ri.scale(42)}
			/>
		);
	};
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
