// Watch
//

/**
 * Provides Moonstone-themed dial-like gauge component.
 *
 * @example
 * <Gauge progress={0.5} backgroundProgress={0.75} />
 *
 * @module agate/Gauge
 * @exports Gauge
 * @exports GaugeBase
 * @exports GaugeDecorator
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';


import Needle from '@enact/agate/Gauge/Needle';
import Ticks from '@enact/agate/Gauge/Ticks';
import Skinnable from '@enact/agate/Skinnable';

import componentCss from './Watch.module.less';

const hourOnes = [2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0];
const hourTens = [1, '', '', '', '', '', '', '', '', '', 1, 1, 0];

/**
 * Renders a agate-styled progress bar.
 *
 * @class GaugeBase
 * @memberof agate/Gauge
 * @ui
 * @public
 */
const WatchBase = kind({
	name: 'Watch',

	propTypes: /** @lends agate/Gauge.GaugeBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `Gauge` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,
		hour: PropTypes.number,
		minute: PropTypes.number,
		second: PropTypes.number
	},

	styles: {
		css: componentCss,
		className: 'watch'
	},

	render: ({css, hour, minute, second, ...rest}) => {
		return (
			<div
				{...rest}
			// css={css}
			>
				<Needle css={css} className={css.handMinor} scale={1.5} progress={minute} />
				<Needle css={css} className={css.handMajor} scale={1} progress={hour} />
				<Needle css={css} className={css.handSubMinor} scale={1} progress={second} />
				<Ticks css={css} className={css.ticksSubMinor} amount={180} distance={150} />
				<Ticks css={css} className={css.ticksMinor} amount={60} distance={150} />
				<Ticks css={css} className={css.ticksMajor} amount={12} distance={150} />
				<Ticks css={css} className={css.ticksMajorNumerals} amount={hourOnes} numerals distance={125} tickOrientation="horizon" startDegree={5} />
				<Ticks css={css} className={css.ticksMajorNumerals} amount={hourTens} numerals distance={125} tickOrientation="horizon" startDegree={-5} />
			</div>
		);
	}
});

const Watch = Skinnable(WatchBase);

export default Watch;
export {
	Watch
};
