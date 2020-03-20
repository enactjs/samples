import kind from '@enact/core/kind';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import {ActivityPanels} from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import PropTypes from 'prop-types';
import React from 'react';
import Changeable from '@enact/ui/Changeable';

import ButtonPanel from '../views/ButtonPanel';
import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		onNavigate: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	styles: {
		css,
		className: 'app'
	},

	handlers: {
		onNextPanel: handle(
			adaptEvent(
				(ev, {index}) => ({index: index + 1}),
				forward('onNavigate')
			)
		),
		onSelectBreadcrumb: forward('onNavigate')
	},

	render: ({index, onNextPanel, onSelectBreadcrumb, ...rest}) => {
		delete rest.onNavigate;
		return (
			<ActivityPanels {...rest} onSelectBreadcrumb={onSelectBreadcrumb} index={index}>
				<MainPanel title="First" onNextPanel={onNextPanel} />
				<ItemPanel title="Second" onNextPanel={onNextPanel} />
				<ButtonPanel title="Third" onNextPanel={onNextPanel} />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
});

export default MoonstoneDecorator(Changeable({prop: 'index', change: 'onNavigate'}, App));
