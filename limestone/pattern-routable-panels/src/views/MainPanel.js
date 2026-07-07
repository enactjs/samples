import kind from '@enact/core/kind';
import Button from '@enact/limestone/Button';
import {Header, Panel} from '@enact/limestone/Panels';
import PropTypes from 'prop-types';

import RouteTree from './RouteTree';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	computed: {
		text: ({next}) => `To ${next} Panel`
	},

	render: ({title, onClick, text, ...rest}) => {
		delete rest.next;
		return (
			<Panel {...rest}>
				<Header title={title} />
				<RouteTree />
				<Button onClick={onClick}>{text}</Button>
			</Panel>
		);
	}
});

export default MainPanel;
