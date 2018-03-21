import {connect} from 'react-redux';
import ri from '@enact/ui/resolution';
import React from 'react';
import PropTypes from 'prop-types';
import {VirtualGridList} from '@enact/moonstone/VirtualList';

import ImageItem from '../ImageItem';

import css from './ImageList.less';

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
				className={css.imageList}
				data={imageitems}
				dataSize={imageitems.length}
				direction="horizontal"
				focusableScrollbar={true}
				itemRenderer={this.renderItem}
				itemSize={{minHeight: ri.scale(384), minWidth: ri.scale(501)}}
			/>
		);
	}
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
