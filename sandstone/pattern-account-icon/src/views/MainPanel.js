import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import AccountIcon from '../components/AccountIcon';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		bgColor: PropTypes.string,
		text: PropTypes.string
	},

	defaultProps: {
		bgColor: 'red'
	},

	render: ({bgColor, text, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title="Account Icon" />
				<Row>
					<Cell shrink>
						<Button size="small" icon="true" iconComponent={<AccountIcon size="small" bgColor={bgColor} text={text} />} />
					</Cell>
					<Cell shrink>
						<Button size="small" icon="profile" />
					</Cell>
				</Row>
			</Panel>
		);
	}
});

export default MainPanel;
