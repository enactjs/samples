import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import {Row, Cell} from '@enact/ui/Layout';

import Heading from '@enact/my-theme/Heading';
import Button from '@enact/my-theme/Button';

import css from './PanelHeader.module.less';

const PanelHeader = kind({
	name: 'PanelHeader',

	propTypes: {
		onNavHomePanel: PropTypes.func
	},

	styles: {
		css,
		className: 'panelHeader'
	},

	render: ({children, onNavHomePanel, ...rest}) => (
		<Row align="center" {...rest}>
			{onNavHomePanel ? <Cell shrink>
				<Button size="small" onClick={onNavHomePanel} icon="arrowlargeleft" />
			</Cell> : null}
			<Cell>
				<Heading size="title" spacing="none">
					{children}
				</Heading>
			</Cell>
		</Row>
	)
});

// Set up PanelHeader so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
PanelHeader.defaultSlot = 'header';

export default PanelHeader;
