import React from 'react';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import MainPanel from '../views/MainPanel';
import EditChannelPanel from '../views/EditChannelPanel';
import css from './App.less';

const AppBase = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: ({onNavigate, index, ...rest}) => (
		<div {...rest}>
			<ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
				<MainPanel onNavigate={onNavigate} index={0} />
				<EditChannelPanel onNavigate={onNavigate} index={1} />
			</ActivityPanels>
		</div>
	)
});

const App = Changeable({change: 'onNavigate', prop: 'index'}, AppBase);

export default MoonstoneDecorator(App);
