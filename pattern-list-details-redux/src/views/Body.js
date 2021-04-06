import kind from '@enact/core/kind';
import React from 'react'; // eslint-disable-line no-unused-vars
import {Row, Cell} from '@enact/ui/Layout';

import SideBarContainer from '../containers/SideBarContainer';
import ContentContainer from '../containers/ContentContainer';

import css from './Body.module.less';

const Body = kind({
	name: 'Body',

	styles: {
		css,
		className: 'body'
	},

	render: ({...rest}) => (
		<Row {...rest}>
			<Cell size="30%" className={css.sidebar}>
				<SideBarContainer />
			</Cell>
			<Cell className={css.content}>
				<ContentContainer />
			</Cell>
		</Row>
	)
});

export default Body;
