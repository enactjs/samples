import {handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';

import videos from '../App/videos.js';

// Remap our titles from `videos` to strings in a new array
// videos[{title: 'value'}] -> videosList['value']
const videosList = videos.map((video) => video.title);

const VideoSelectionPanel = kind({
	name: 'VideoSelectionPanel',

	propTypes: {
		/**
		 * A function to hide the Panels.
		 * @type {Function}
		 */
		onHidePanels: PropTypes.func,

		/**
		 * A function that receives the selected video's index.
		 * @type {Function}
		 */
		onVideoIndexChange: PropTypes.func,

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
		onVideoIndexChange: handle(
			(ev, {onVideoIndexChange}) => onVideoIndexChange(ev.selected)
		)
	},

	render: ({title, onHidePanels, onVideoIndexChange, videoIndex, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header subtitle={videos[videoIndex].title} title={title}>
					<Button onClick={onHidePanels} size="small">Hide Panels</Button>
				</Header>
				<Scroller>
					<Group
						childComponent={RadioItem}
						defaultSelected={videoIndex}
						onSelect={onVideoIndexChange}
						select="radio"
						selectedProp="selected"
					>
						{videosList}
					</Group>
				</Scroller>
			</Panel>
		);
	}
});

export default VideoSelectionPanel;
