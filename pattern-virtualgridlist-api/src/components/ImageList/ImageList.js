import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution';
import React from 'react';
import PropTypes from 'prop-types';
import {VirtualGridList} from '@enact/moonstone/VirtualList';

import ImageItem from '../ImageItem';

/*
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
				data={imageitems}
				dataSize={imageitems.length}
				itemRenderer={this.renderItem}
				itemSize={{minHeight: ri.scale(270), minWidth: ri.scale(180)}}
				spacing={ri.scale(21)}
			/>
		);
	}
}
*/

const withCoolCustomProp = (props) => {
	if (typeof props.index === 'number') {
		return (<ImageItem {...props} {...withCoolCustomProp.coolCustomProp} />);
	} else {
		const {a, b, c} = props;
		withCoolCustomProp.coolCustomProp = {a, b, c};
		return withCoolCustomProp;
	}
};

withCoolCustomProp.propTypes = {
	a: PropTypes.number,
	b: PropTypes.number,
	c: PropTypes.number,
	index: PropTypes.number
};

const ImageList = kind({
	name: 'Button',

	propTypes: {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array
	},

	computed: {
		itemRenderer: withCoolCustomProp
	},

	render: (props) => {
		const {imageitems, itemRenderer, ...rest} = props;

		delete rest.dispatch;
		delete rest.imageitems;

		return (
			<VirtualGridList
				{...rest}
				data={imageitems}
				dataSize={imageitems.length}
				itemRenderer={itemRenderer}
				itemSize={{minHeight: ri.scale(270), minWidth: ri.scale(180)}}
				spacing={ri.scale(21)}
			/>
		);
	}
});

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
