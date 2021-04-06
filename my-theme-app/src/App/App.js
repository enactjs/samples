import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import {handle, adaptEvent, forward} from '@enact/core/handle';
import Changeable from '@enact/ui/Changeable';
import Panels from '@enact/my-theme/Panels';
import ThemeDecorator from '@enact/my-theme/ThemeDecorator';

import MainPanel from '../views/MainPanel';
import Items from '../views/Items';
import ButtonsIcons from '../views/ButtonsIcons';

import css from './App.module.less';

const App = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		onNavigate: PropTypes.func
	},

	styles: {
		css,
		className: 'app'
	},

	handlers: {
		onNavHomePanel: handle(adaptEvent(() => ({index: 0}), forward('onNavigate'))),
		onNavButtonsPanel: handle(adaptEvent(() => ({index: 1}), forward('onNavigate'))),
		onNavItemsPanel: handle(adaptEvent(() => ({index: 2}), forward('onNavigate')))
	},

	render: ({index, onNavButtonsPanel, onNavItemsPanel, onNavHomePanel, ...rest}) => {
		delete rest.onNavigate;
		return (
			<div {...rest}>
				<Panels index={index}>
					<MainPanel onNavButtonsPanel={onNavButtonsPanel} onNavItemsPanel={onNavItemsPanel} />
					<ButtonsIcons onNavHomePanel={onNavHomePanel} />
					<Items onNavHomePanel={onNavHomePanel} />
				</Panels>
			</div>
		);
	}
});

export default ThemeDecorator(Changeable({prop: 'index', change: 'onNavigate'}, App));
