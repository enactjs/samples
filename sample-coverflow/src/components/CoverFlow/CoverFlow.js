/*
 * Exports the CoverFlow component built on horizontal VirtualList
 * The default export is CoverFlow.
 */

import {GridListImageItem} from '@enact/moonstone/VirtualList';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';

import {CoverFlowList} from '../CoverFlowList';
import css from './CoverFlow.less';

class CoverFlow extends Component {
	static propTypes = {
		data: PropTypes.any,
		dataSize: PropTypes.number
	}

	renderItem ({data, index, ...rest}) {
		const {source} = data[index];

		return (
			<GridListImageItem
				{...rest}
				style={{width: ri.scale(264), height: ri.scale(171)}}
				source={source}
			/>
		);
	}

	render () {
		const {data, dataSize} = this.props;
		return (
			<CoverFlowList
				component={this.renderItem}
				data={data}
				dataSize={dataSize}
				itemSize={ri.scale(264)}
				style={{height: ri.scale(350), top: ri.scale(100)}}
			/>
		);
	}
}

export default CoverFlow;
export {CoverFlow};
