import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import AccountIcon from '../components/AccountIcon';

import css from './MainPanel.module.less';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		bgColor: PropTypes.string,
		initialName: PropTypes.string
	},

	defaultProps: {
		bgColor: 'red'
	},

	render: ({bgColor, initialName, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header title="Account Icon" />
				<Row>
					<Cell shrink>
						<Button css={css} size="small" icon iconComponent={<AccountIcon bgColor={bgColor} initialName={initialName} />} />
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
