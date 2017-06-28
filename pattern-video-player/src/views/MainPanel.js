import kind from '@enact/core/kind';
import {handle} from '@enact/core/handle';
import Group from '@enact/ui/Group';
import Button from '@enact/moonstone/Button';
import RadioItem from '@enact/moonstone/RadioItem';
import Scroller from '@enact/moonstone/Scroller';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

import videos from '../App/videos.js';

// Remap our titles from `videos` to strings in a new array
// videos[{title: 'value'}] -> videosList['value']
const videosList = videos.map((video) => video.title);

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to hide the Panels.
		 * @type {Function}
		 */
		onHidePanels: PropTypes.func,

		/**
		 * A function to activate the next Panel.
		 * @type {Function}
		 */
		onNextPanel: PropTypes.func,

		/**
		 * A function that receives the selected video's index.
		 * @type {Function}
		 */
		setVideoIndex: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string,

		/**
		 * The index number of the selected video.
		 *
		 * @type {Number}
		 */
		videoIndex: PropTypes.number
	},

	handlers: {
		setVideoIndex: handle(
			(ev, {setVideoIndex}) => setVideoIndex(ev.selected)
		)
	},

	render: ({title, onNextPanel, onHidePanels, setVideoIndex, videoIndex, ...rest}) => {
		delete rest.setVideoIndex;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow={videos[videoIndex].title}>
					<Button onClick={onNextPanel} small>Next Panel</Button>
					<Button onClick={onHidePanels} small>Hide Panels</Button>
				</Header>
				<Scroller>
					<Group select="radio" selectedProp="selected" childComponent={RadioItem} defaultSelected={videoIndex} onSelect={setVideoIndex}>
						{videosList}
					</Group>
				</Scroller>
			</Panel>
		);
	}
});

export default MainPanel;
