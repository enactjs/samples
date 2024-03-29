import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';

import {PatternList} from './PatternList';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({title, onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
			</Header>
			<PatternList id={title} index={rest['data-index']} onClick={onClick} />
		</Panel>
	)
});

export default MainPanel;
