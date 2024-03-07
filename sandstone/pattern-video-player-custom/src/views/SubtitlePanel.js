import {handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';

import videos from '../App/videos.js';

const SubtitlePanel = kind({
	name: 'SubtitlePanel',

	propTypes: {
		/**
		 * A function to hide the Panels.
		 * @type {Function}
		 */
		onHidePanels: PropTypes.func,

		/**
		 * A function that receives the selected subtitle's index.
		 * @type {Function}
		 */
		onSubtitleIndexChange: PropTypes.func,

		/**
		 * The index number of the selected subtitle.
		 *
		 * @type {Number}
		 */
		subtitleIndex: PropTypes.number,

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

	computed: {
		subtitlesList: ({videoIndex}) => {
			const subtitlesList = videos[videoIndex].subtitles.map((subtitle) => subtitle.lang);
			subtitlesList.unshift("off");
			return subtitlesList;
		}
	},

	handlers: {
		onSubtitleIndexChange: handle(
			(ev, {onSubtitleIndexChange}) => onSubtitleIndexChange(ev.selected)
		)
	},

	render: ({title, onHidePanels, onSubtitleIndexChange, subtitleIndex, subtitlesList, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title={title}>
					<Button onClick={onHidePanels} size="small">Hide Panels</Button>
				</Header>
				<Scroller>
					<Group
						childComponent={RadioItem}
						defaultSelected={subtitleIndex}
						onSelect={onSubtitleIndexChange}
						select="radio"
						selectedProp="selected"
					>
						{subtitlesList}
					</Group>
				</Scroller>
			</Panel>
		);
	}
});

export default SubtitlePanel;
