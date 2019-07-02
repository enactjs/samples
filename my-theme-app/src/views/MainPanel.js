import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';

import BodyText from '@enact/my-theme/BodyText';
import Icon from '@enact/my-theme/Icon';
import SlotItem from '@enact/my-theme/SlotItem';
import {Panel} from '@enact/my-theme/Panels';

import PanelHeader from '../components/PanelHeader';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		onNavButtonsPanel: PropTypes.func,
		onNavItemsPanel: PropTypes.func
	},

	render: ({onNavButtonsPanel, onNavItemsPanel, ...rest}) => (
		<Panel {...rest}>
			<PanelHeader>MyTheme Starter-app</PanelHeader>
			<BodyText>
				This is BodyText
			</BodyText>
			<BodyText>
				Choose a category below to see a demonstration of components using &quot;my-theme&quot;.
			</BodyText>
			<SlotItem onClick={onNavButtonsPanel}><slotBefore><Icon size="small">layers</Icon></slotBefore>Buttons & Icons</SlotItem>
			<SlotItem onClick={onNavItemsPanel}><slotBefore><Icon size="small">menu</Icon></slotBefore>Items</SlotItem>
		</Panel>
	)
});

export default MainPanel;
