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
				className={css.item}
				source={source}
			/>
		);
	}

	render () {
		const {data, dataSize} = this.props;
		return (
			<CoverFlowList
				component={this.renderItem}
				coverFlowParams={{
					rotation: -10,
					depth: ri.scale(700),
					density: 5,
					gap: 2.25,
					spread: 0.26,
					centerGravity: 9 // Larger number would give you the lower center image
				}}
				overhang={5} // Make sure you pass the same number with the density
				className={css.list}
				data={data}
				dataSize={dataSize}
				itemSize={ri.scale(264)}
			/>
		);
	}
}

export default CoverFlow;
export {CoverFlow};
