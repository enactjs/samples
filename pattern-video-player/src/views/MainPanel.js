import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import RadioItem from '@enact/moonstone/RadioItem';
import Scroller from '@enact/moonstone/Scroller';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

import videos from '../App/videos.js';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		hidePanels: PropTypes.func,

		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		nextPanel: PropTypes.func,

		setVideoIndex: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string,

		videoIndex: PropTypes.number
	},

	computed: {
		handleSetVideoIndex: ({setVideoIndex}) => (index) => () => setVideoIndex(index)
	},

	render: ({title, nextPanel, hidePanels, handleSetVideoIndex, videoIndex, ...rest}) => {
		delete rest.setVideoIndex;
		return (
			<Panel {...rest}>
				<Header title={title} titleBelow={videos[videoIndex].title}>
					<Button onClick={nextPanel} small>Next Panel</Button>
					<Button onClick={hidePanels} small>Hide Panels</Button>
				</Header>
				<Scroller>
					{videos.map((video, index) => (
						<RadioItem
							onClick={handleSetVideoIndex(index)}
							key={index}
							selected={index === videoIndex}
						>
							{video.title}
						</RadioItem>
					))}
				</Scroller>
			</Panel>
		);
	}
});

export default MainPanel;
