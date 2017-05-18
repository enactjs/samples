/*
 * Exports the CoverFlowList
 */

import classNames from 'classnames';
import {contextTypes} from '@enact/i18n/I18nDecorator';
import {is} from '@enact/core/keymap';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

import {dataIndexAttribute, CoverFlowScrollable} from './CoverFlowScrollable';

import css from './CoverFlowList.less';

const
	dataContainerMutedAttribute = 'data-container-muted',
	dataContainerIdAttribute = 'data-container-id',
	isDown = is('down'),
	isLeft = is('left'),
	isRight = is('right'),
	isUp = is('up'),
	nop = () => {};

/**
 * The shape for the grid list item size in a list.
 *
 * @typedef {Object} gridListItemSizeShape
 * @property {Number} minWidth - The minimum width of the grid list item.
 * @property {Number} minHeight - The minimum height of the grid list item.
 */
const gridListItemSizeShape = PropTypes.shape({
	minWidth: PropTypes.number.isRequired,
	minHeight: PropTypes.number.isRequired
});

/**
 * @class CoverFlowListCore
 * @ui
 * @private
 */
class CoverFlowListCore extends Component {
	static displayName = 'CoverFlowList'

	static propTypes = {
		/**
		 * The render function for an item of the list.
		 * `index` is for accessing the index of the item.
		 * `key` MUST be passed as a prop for DOM recycling.
		 * Data manipulation can be done in this function.
		 *
		 * @type {Function}
		 * @public
		 */
		component: PropTypes.func.isRequired,

		/**
		 * Size of an item for the list; valid values are either a number for `VirtualList`
		 * or an object that has `minWidth` and `minHeight` for `VirtualGridList`.
		 *
		 * @type {Number|moonstone/VirtualList.gridListItemSizeShape}
		 * @public
		 */
		itemSize: PropTypes.oneOfType([
			PropTypes.number,
			gridListItemSizeShape
		]).isRequired,

		/**
		 * Parameters for cover flow
		 * You may pass below like information
		 * rotation: -10,
		   depth: ri.scale(500),
		   density: 9, // should be an odd number
		   gap: 2.25,
		   spread: 0.16
		 */
		coverFlowParams: PropTypes.object,

		/**
		 * Callback method of scrollTo.
		 * Normally, `Scrollable` should set this value.
		 *
		 * @type {Function}
		 * @private
		 */
		cbScrollTo: PropTypes.func,

		/**
		 * Client size of the list; valid values are an object that has `clientWidth` and `clientHeight`.
		 *
		 * @type {Object}
		 * @property {Number} clientWidth - The client width of the list.
		 * @property {Number} clientHeight - The client height of the list.
		 * @public
		 */
		clientSize: PropTypes.shape({
			clientWidth: PropTypes.number.isRequired,
			clientHeight:  PropTypes.number.isRequired
		}),

		/**
		 * Data for the list.
		 * Check mutation of this and determine whether the list should update or not.
		 *
		 * @type {Any}
		 * @default []
		 * @public
		 */
		data: PropTypes.any,

		/**
		 * Size of the data.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		dataSize: PropTypes.number,

		/**
		 * Direction of the list; valid values are `'horizontal'` and `'vertical'`.
		 *
		 * @type {String}
		 * @default 'vertical'
		 * @public
		 */
		direction: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Number of spare DOM node.
		 * `3` is good for the default value experimentally and
		 * this value is highly recommended not to be changed by developers.
		 *
		 * @type {Number}
		 * @default 3
		 * @private
		 */
		overhang: PropTypes.number,

		/**
		 * It scrolls by page when 'true', by item when 'false'
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		pageScroll: PropTypes.bool,

		/**
		 * Spacing between items.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		spacing: PropTypes.number
	}

	static contextTypes = contextTypes

	static defaultProps = {
		cbScrollTo: nop,
		coverFlowParams: {
			rotation: -10,
			depth: ri.scale(500),
			density: 9,
			gap: 2.25,
			spread: 0.16,
			centerGravity: 2
		},
		data: [],
		dataSize: 0,
		direction: 'horizontal',
		overhang: 9,
		pageScroll: false,
		spacing: 0
	}

	constructor (props) {
		super(props);

		this.state = {firstIndex: 0, numOfItems: 0};
		this.initContainerRef = this.initRef('containerRef');
	}

	componentWillMount () {
		if (this.props.clientSize) {
			this.calculateMetrics(this.props);
			this.updateStatesAndBounds(this.props);
		}
	}

	// Calculate metrics for VirtualList after the 1st render to know client W/H.
	// We separate code related with data due to re use it when data changed.
	componentDidMount () {
		const containerNode = this.containerRef;

		if (!this.props.clientSize) {
			this.calculateMetrics(this.props);
			this.updateStatesAndBounds(this.props);
		}
		// prevent native scrolling by Spotlight
		this.preventScroll = () => {
			containerNode.scrollTop = 0;
			containerNode.scrollLeft = this.context.rtl ? containerNode.scrollWidth : 0;
		};

		if (containerNode && containerNode.addEventListener) {
			containerNode.addEventListener('scroll', this.preventScroll);
		}
	}

	// Call updateStatesAndBounds here when dataSize has been changed to update nomOfItems state.
	// Calling setState within componentWillReceivePropswill not trigger an additional render.
	componentWillReceiveProps (nextProps) {
		const
			{dataSize, direction, itemSize, overhang, spacing} = this.props,
			hasMetricsChanged = (
				direction !== nextProps.direction ||
				((itemSize instanceof Object) ? (itemSize.minWidth !== nextProps.itemSize.minWidth || itemSize.minHeight !== nextProps.itemSize.minHeight) : itemSize !== nextProps.itemSize) ||
				overhang !== nextProps.overhang ||
				spacing !== nextProps.spacing
			),
			hasDataChanged = (dataSize !== nextProps.dataSize);

		if (hasMetricsChanged) {
			this.calculateMetrics(nextProps);
			this.updateStatesAndBounds(nextProps);
		} else if (hasDataChanged) {
			this.updateStatesAndBounds(nextProps);
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		if ((this.props.dataSize !== nextProps.dataSize) &&
			(nextState.firstIndex + nextState.numOfItems) < nextProps.dataSize) {
			return false;
		}
		return true;
	}

	componentWillUnmount () {
		const containerNode = this.containerRef;

		// remove a function for preventing native scrolling by Spotlight
		if (containerNode && containerNode.removeEventListener) {
			containerNode.removeEventListener('scroll', this.preventScroll);
		}
	}

	scrollBounds = {
		clientWidth: 0,
		clientHeight: 0,
		scrollWidth: 0,
		scrollHeight: 0,
		maxLeft: 0,
		maxTop: 0,
		xSnap: 0
	}

	moreInfo = {
		firstVisibleIndex: null,
		lastVisibleIndex: null
	}

	primary = null
	secondary = null

	isPrimaryDirectionVertical = true
	isItemSized = false

	dimensionToExtent = 0
	threshold = 0
	maxFirstIndex = 0
	curDataSize = 0
	cc = []
	scrollPosition = 0
	updateFrom = null
	updateTo = null

	containerRef = null

	// spotlight
	nodeIndexToBeBlurred = null
	lastFocusedIndex = null

	// cover flow
	animationParams = null

	isVertical = () => this.isPrimaryDirectionVertical

	isHorizontal = () => !this.isPrimaryDirectionVertical

	getScrollBounds = () => this.scrollBounds

	getMoreInfo = () => this.moreInfo

	getGridPosition (index) {
		const
			{dimensionToExtent, primary, secondary} = this,
			primaryPosition = Math.floor(index / dimensionToExtent) * primary.gridSize,
			secondaryPosition = (index % dimensionToExtent) * secondary.gridSize;

		return {primaryPosition, secondaryPosition};
	}

	getItemPosition = (index) => this.gridPositionToItemPosition(this.getGridPosition(index))

	gridPositionToItemPosition = ({primaryPosition, secondaryPosition}) =>
		(this.isPrimaryDirectionVertical ? {left: secondaryPosition, top: primaryPosition} : {left: primaryPosition, top: secondaryPosition})

	getClientSize = (node) => {
		return {
			clientWidth: node.clientWidth,
			clientHeight: node.clientHeight
		};
	}

	calculateMetrics (props) {
		const
			{clientSize, coverFlowParams, direction, itemSize, spacing} = props,
			node = this.containerRef;

		if (!clientSize && !node) {
			return;
		}

		const
			{clientWidth, clientHeight} = (clientSize || this.getClientSize(node)),
			heightInfo = {
				clientSize: clientHeight,
				minItemSize: itemSize.minHeight || null,
				itemSize: itemSize
			},
			widthInfo = {
				clientSize: clientWidth,
				minItemSize: itemSize.minWidth || null,
				itemSize: itemSize
			};
		let primary, secondary, dimensionToExtent, thresholdBase;

		// CrazyCoverFlow parity
		this.animationParams = this.getCoverFlowParams({
			...coverFlowParams,
			itemSize,
			distance: clientWidth
		});
		widthInfo.itemSize = this.animationParams.avgItemSize;

		this.isPrimaryDirectionVertical = (direction === 'vertical');

		if (this.isPrimaryDirectionVertical) {
			primary = heightInfo;
			secondary = widthInfo;
		} else {
			primary = widthInfo;
			secondary = heightInfo;
		}
		dimensionToExtent = 1;

		this.isItemSized = (primary.minItemSize && secondary.minItemSize);

		if (this.isItemSized) {
			// the number of columns is the ratio of the available width plus the spacing
			// by the minimum item width plus the spacing
			dimensionToExtent = Math.max(Math.floor((secondary.clientSize + spacing) / (secondary.minItemSize + spacing)), 1);
			// the actual item width is a ratio of the remaining width after all columns
			// and spacing are accounted for and the number of columns that we know we should have
			secondary.itemSize = Math.round((secondary.clientSize - (spacing * (dimensionToExtent - 1))) / dimensionToExtent);
			// the actual item height is related to the item width
			primary.itemSize = Math.round(primary.minItemSize * (secondary.itemSize / secondary.minItemSize));
		}

		primary.gridSize = primary.itemSize + spacing;
		secondary.gridSize = secondary.itemSize + spacing;
		thresholdBase = primary.gridSize * this.animationParams.density;

		this.threshold = {min: -Infinity, max: thresholdBase, base: thresholdBase};
		this.dimensionToExtent = dimensionToExtent;

		this.primary = primary;
		this.secondary = secondary;

		// reset
		this.scrollPosition = 0;
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.firstIndex = 0;
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.numOfItems = 0;
	}

	updateStatesAndBounds (props) {
		const
			{dataSize, overhang} = props,
			{firstIndex} = this.state,
			{dimensionToExtent, primary, moreInfo} = this,
			numOfItems = Math.min(dataSize, dimensionToExtent * (Math.ceil(primary.clientSize / primary.gridSize) + overhang)),
			wasFirstIndexMax = ((this.maxFirstIndex < moreInfo.firstVisibleIndex - dimensionToExtent) && (firstIndex === this.maxFirstIndex));

		this.maxFirstIndex = dataSize - numOfItems;
		this.curDataSize = dataSize;
		this.updateFrom = null;
		this.updateTo = null;

		// reset children
		this.cc = [];

		this.setState({firstIndex: wasFirstIndexMax ? this.maxFirstIndex : Math.min(firstIndex, this.maxFirstIndex), numOfItems});
		this.calculateScrollBounds(props);
	}

	calculateScrollBounds (props) {
		const
			{clientSize} = props,
			node = this.containerRef;

		if (!clientSize && !node) {
			return;
		}

		const
			{scrollBounds, isPrimaryDirectionVertical} = this,
			{clientWidth, clientHeight} = clientSize || this.getClientSize(node);
		let maxPos;

		scrollBounds.clientWidth = clientWidth;
		scrollBounds.clientHeight = clientHeight;
		scrollBounds.scrollWidth = this.getScrollWidth();
		scrollBounds.scrollHeight = this.getScrollHeight();
		scrollBounds.maxLeft = Math.max(0, scrollBounds.scrollWidth - clientWidth);
		scrollBounds.maxTop = Math.max(0, scrollBounds.scrollHeight - clientHeight);
		scrollBounds.xSnap = this.primary.itemSize;

		// correct position
		maxPos = isPrimaryDirectionVertical ? scrollBounds.maxTop : scrollBounds.maxLeft;

		this.syncThreshold(maxPos);

		if (this.scrollPosition > maxPos) {
			this.props.cbScrollTo({position: (isPrimaryDirectionVertical) ? {y: maxPos} : {x: maxPos}});
		}
	}

	syncThreshold (maxPos) {
		const {threshold} = this;

		if (threshold.max > maxPos) {
			if (maxPos < threshold.base) {
				threshold.max = threshold.base;
				threshold.min = -Infinity;
			} else {
				threshold.max = maxPos;
				threshold.min = maxPos - threshold.base;
			}
		}
	}

	getCoverFlowParams ({itemSize = 300, rotation = 60, depth = 1000, density = 5, spread = 0.16, gap = 2, distance = ri.scale(1920), centerGravity = 2}) {
		const
			gapSize = itemSize * gap,
			avgItemSize = distance / density,
			inc = 1 / density,
			halfGap = gapSize / 2,
			halfItem = itemSize / 2,
			midPoint = distance / 2,
			midPos = midPoint - halfItem,
			offset = spread * distance,
			params = {
				avgItemSize,
				density,
				centerGravity,
				// constants
				k0: 0 - (0.8 * inc),
				k1: 0.5 - inc,
				k2: 0.5,
				k3: 0.5 + inc,
				k4: 1 + (0.8 * inc),
				// positions
				pos0: distance - halfItem + offset,
				pos1: midPos + halfGap,
				pos2: midPos,
				pos3: midPos - halfGap,
				pos4: 0 - halfItem - offset,
				// rotations
				rot0: -rotation,
				rot1: 0,
				rot2: rotation,
				// depths
				z0: -depth,
				z1: -0.25 * depth,
				z2: 0
			};

		return params;
	}

	setScrollPosition (x, y, dirX, dirY) {
		const
			{firstIndex, numOfItems} = this.state,
			{isPrimaryDirectionVertical, threshold, dimensionToExtent, maxFirstIndex, scrollBounds} = this,
			{gridSize} = this.primary,
			maxPos = isPrimaryDirectionVertical ? scrollBounds.maxTop : scrollBounds.maxLeft,
			minOfMax = threshold.base,
			maxOfMin = maxPos - minOfMax;
		let
			delta, numOfGridLines, newFirstIndex = firstIndex, pos, dir = 0;

		if (isPrimaryDirectionVertical) {
			pos = y;
			dir = dirY;
		} else {
			pos = x;
			dir = dirX;
		}

		if (dir === 1 && pos > threshold.max) {
			delta = pos - threshold.max;
			numOfGridLines = Math.ceil(delta / gridSize); // how many lines should we add
			threshold.max = Math.min(maxPos, threshold.max + numOfGridLines * gridSize);
			threshold.min = Math.min(maxOfMin, threshold.max - gridSize);
			newFirstIndex = Math.min(maxFirstIndex, (dimensionToExtent * Math.ceil(firstIndex / dimensionToExtent)) + (numOfGridLines * dimensionToExtent));
		} else if (dir === -1 && pos < threshold.min) {
			delta = threshold.min - pos;
			numOfGridLines = Math.ceil(delta / gridSize);
			threshold.max = Math.max(minOfMax, threshold.min - (numOfGridLines * gridSize - gridSize));
			threshold.min = (threshold.max > minOfMax) ? threshold.max - gridSize : -Infinity;
			newFirstIndex = Math.max(0, (dimensionToExtent * Math.ceil(firstIndex / dimensionToExtent)) - (numOfGridLines * dimensionToExtent));
		}

		this.syncThreshold(maxPos);
		this.scrollPosition = pos;

		if (firstIndex !== newFirstIndex) {
			this.setState({firstIndex: newFirstIndex});
		} else {
			this.positionItems({updateFrom: firstIndex, updateTo: firstIndex + numOfItems});
		}
	}

	applyStyleToExistingNode = (index, ...rest) => {
		const
			{numOfItems} = this.state,
			node = this.containerRef.children[index % numOfItems];

		if (node) {
			if ((index % numOfItems) === this.nodeIndexToBeBlurred && index !== this.lastFocusedIndex) {
				node.blur();
				this.nodeIndexToBeBlurred = null;
			}
			this.composeStyle(node.style, ...rest);
		}
	}

	applyStyleToNewNode = (index, ...rest) => {
		const
			{component, data} = this.props,
			{numOfItems} = this.state,
			key = index % numOfItems,
			itemElement = component({
				data,
				[dataIndexAttribute]: index,
				index,
				key
			}),
			style = {};

		this.composeStyle(style, ...rest);

		this.cc[key] = React.cloneElement(itemElement, {
			className: classNames(css.listItem, itemElement.props.className),
			style: {...itemElement.props.style, ...style}
		});
	}

	positionItems ({updateFrom, updateTo}) {
		const
			{primary, scrollPosition, moreInfo, animationParams} = this,
			distance = (primary.clientSize + primary.itemSize),
			offsetIndex = Math.ceil(animationParams.density / 2);
		let
			{primaryPosition} = this.getGridPosition(updateFrom),
			firstVisibleIndex = null, lastVisibleIndex = null;

		primaryPosition -= scrollPosition;

		// positioning items
		for (let i = updateFrom; i < updateTo; i++) {
			const
				enterPos = primary.itemSize * (i - offsetIndex),
				t = (scrollPosition - enterPos) / distance;
			// determine the first and the last visible item
			if (firstVisibleIndex === null && (primaryPosition + (primary.itemSize * offsetIndex)) > 0) {
				firstVisibleIndex = i;
			}
			if (primaryPosition < primary.clientSize - primary.itemSize) {
				lastVisibleIndex = i;
			}

			if (this.updateFrom === null || this.updateTo === null || this.updateFrom > i || this.updateTo <= i) {
				this.applyStyleToNewNode(i, t, this.animationParams);
			} else {
				this.applyStyleToExistingNode(i, t, this.animationParams);
			}

			primaryPosition += primary.gridSize;
		}

		this.updateFrom = updateFrom;
		this.updateTo = updateTo;
		moreInfo.firstVisibleIndex = firstVisibleIndex;
		moreInfo.lastVisibleIndex = lastVisibleIndex;
	}

	composeStyle (style, t, p) {
		let
			_t0, _t1, _p0, _p1, _z0, _z1, _r0, _r1,
			duration, deltaP, deltaZ, deltaR, tt, pos, rot, zPos, yPos, op;

		if (t < p.k1) {
			_t0 = 0;
			_t1 = p.k1;
			_p0 = p.pos0;
			_p1 = p.pos1;
			_z0 = p.z0;
			_z1 = p.z1;
			_r0 = p.rot0;
			_r1 = p.rot0;
		} else if (t < p.k2) {
			_t0 = p.k1;
			_t1 = p.k2;
			_p0 = p.pos1;
			_p1 = p.pos2;
			_z0 = p.z1;
			_z1 = p.z2;
			_r0 = p.rot0;
			_r1 = p.rot1;
		} else if (t < p.k3) {
			_t0 = p.k2;
			_t1 = p.k3;
			_p0 = p.pos2;
			_p1 = p.pos3;
			_z0 = p.z2;
			_z1 = p.z1;
			_r0 = p.rot1;
			_r1 = p.rot2;
		} else {
			_t0 = p.k3;
			_t1 = 1;
			_p0 = p.pos3;
			_p1 = p.pos4;
			_z0 = p.z1;
			_z1 = p.z0;
			_r0 = p.rot2;
			_r1 = p.rot2;
		}

		duration = _t1 - _t0;
		deltaP = _p1 - _p0;
		deltaZ = _z1 - _z0;
		deltaR = _r1 - _r0;
		tt = (t - _t0) / duration;

		pos = (_p0 + (tt * deltaP)).toFixed(12);
		rot = (_r0 + (tt * deltaR)).toFixed(12);
		zPos = (_z0 + (tt * deltaZ)).toFixed(12);
		yPos = 0;

		if (Math.abs(zPos) < ri.scale(75)) {
			yPos = (ri.scale(75) - Math.abs(zPos)) / (-p.centerGravity) ;
		}

		if (t < 0) {
			op = Math.max(0, 1 - (t / p.k0));
		} else if (t > 1) {
			op = Math.max(0, 1 - ((t - 1) / (p.k4 - 1)));
		} else {
			op = 1;
		}

		style.transform = 'translate3d(' + pos + 'px,' + yPos + 'px,' + zPos + 'px) rotateY(' + rot + 'deg)';
		style.opacity = op;
	}

	getXY = (primaryPosition, secondaryPosition) => {
		const rtlDirection = this.context.rtl ? -1 : 1;
		return (this.isPrimaryDirectionVertical ? {x: (secondaryPosition * rtlDirection), y: primaryPosition} : {x: (primaryPosition * rtlDirection), y: secondaryPosition});
	}

	composeTransform (style, primaryPosition, secondaryPosition = 0) {
		const {x, y} = this.getXY(primaryPosition, secondaryPosition);

		style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
	}

	getScrollHeight = () => (this.isPrimaryDirectionVertical ? this.getVirtualScrollDimension() : this.scrollBounds.clientHeight)

	getScrollWidth = () => (this.isPrimaryDirectionVertical ? this.scrollBounds.clientWidth : this.getVirtualScrollDimension())

	getVirtualScrollDimension = () => {
		const
			{dimensionToExtent, primary, curDataSize} = this,
			{spacing} = this.props;

		return (Math.ceil(curDataSize / dimensionToExtent) * primary.gridSize) - spacing + primary.clientSize - primary.itemSize;
	}

	focusByIndex = (index) => {
		// We have to focus node async for now since list items are not yet ready when it reaches componentDid* lifecycle methods
		setTimeout(() => {
			const item = this.containerRef.querySelector(`[data-index='${index}'].spottable`);
			this.focusOnNode(item);
		}, 0);
	}

	focusOnNode = (node) => {
		if (node) {
			Spotlight.focus(node);
		}
	}

	calculatePositionOnFocus = (item) => {
		const
			{pageScroll} = this.props,
			{primary, numOfItems, scrollPosition} = this,
			offsetToClientEnd = primary.clientSize - primary.itemSize,
			focusedIndex = Number.parseInt(item.getAttribute(dataIndexAttribute));

		if (!isNaN(focusedIndex)) {
			let gridPosition = this.getGridPosition(focusedIndex);

			this.nodeIndexToBeBlurred = this.lastFocusedIndex % numOfItems;
			this.lastFocusedIndex = focusedIndex;

			if (primary.clientSize >= primary.itemSize) {
				if (gridPosition.primaryPosition > scrollPosition + offsetToClientEnd) { // forward over
					gridPosition.primaryPosition -= pageScroll ? 0 : offsetToClientEnd;
				} else { // backward over
					gridPosition.primaryPosition -= pageScroll ? offsetToClientEnd : 0;
				}
			}

			// Since the result is used as a target position to be scrolled,
			// scrondaryPosition should be 0 here.
			gridPosition.secondaryPosition = 0;
			return this.gridPositionToItemPosition(gridPosition);
		}
	}

	setRestrict = (bool) => {
		Spotlight.set(this.props[dataContainerIdAttribute], {restrict: (bool) ? 'self-only' : 'self-first'});
	}

	setSpotlightContainerRestrict = (keyCode, index) => {
		const
			{dataSize} = this.props,
			{isPrimaryDirectionVertical, dimensionToExtent} = this,
			canMoveBackward = index >= dimensionToExtent,
			canMoveForward = index < (dataSize - (((dataSize - 1) % dimensionToExtent) + 1));
		let isSelfOnly = false;

		if (isPrimaryDirectionVertical) {
			if (isUp(keyCode) && canMoveBackward || isDown(keyCode) && canMoveForward) {
				isSelfOnly = true;
			}
		} else if (isLeft(keyCode) && canMoveBackward || isRight(keyCode) && canMoveForward) {
			isSelfOnly = true;
		}

		this.setRestrict(isSelfOnly);
	}

	setContainerDisabled = (bool) => {
		const containerNode = this.containerRef;

		if (containerNode) {
			containerNode.setAttribute(dataContainerMutedAttribute, bool);
		}
	}

	syncClientSize = () => {
		const
			{props} = this,
			node = this.containerRef;

		if (!props.clientSize && !node) {
			return;
		}

		const
			{clientWidth, clientHeight} = props.clientSize || this.getClientSize(node),
			{scrollBounds} = this;

		if (clientWidth !== scrollBounds.clientWidth || clientHeight !== scrollBounds.clientHeight) {
			this.calculateMetrics(props);
			this.updateStatesAndBounds(props);
		}
	}

	// render

	initRef (prop) {
		return (ref) => {
			this[prop] = ref;
		};
	}

	renderCalculate () {
		const
			{dataSize} = this.props,
			{firstIndex, numOfItems} = this.state,
			max = Math.min(dataSize, firstIndex + numOfItems);

		this.positionItems({updateFrom: firstIndex, updateTo: max});
	}

	render () {
		const
			props = Object.assign({}, this.props),
			{primary, cc} = this,
			classes = classNames(props.className, css.container);

		delete props.cbScrollTo;
		delete props.className;
		delete props.clientSize;
		delete props.coverFlowParams;
		delete props.component;
		delete props.data;
		delete props.dataSize;
		delete props.direction;
		delete props.itemSize;
		delete props.overhang;
		delete props.pageScroll;
		delete props.spacing;

		if (primary) {
			this.renderCalculate();
		}

		return (
			<div {...props} className={classes} style={{overflow: 'visible'}} ref={this.initContainerRef}>
				{cc}
			</div>
		);
	}
}

/**
 * CoverFlowList is a list for a cover flow
 *
 * @class CoverFlowList
 * @mixes CoverFlowScrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @ui
 * @private
 */
const CoverFlowList = SpotlightContainerDecorator({restrict: 'self-first'}, CoverFlowScrollable(CoverFlowListCore));

export default CoverFlowList;
export {CoverFlowList};
