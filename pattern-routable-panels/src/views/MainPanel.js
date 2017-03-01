import React from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';

import RouteTree from './RouteTree';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		onPath: React.PropTypes.func,
		parents: React.PropTypes.string,
		title: React.PropTypes.string
	},

	handlers: {
		onFirstClick: (ev, {onPath, title, parents}) => onPath({path: `${parents}/${title}/first`}),
		onSecondClick: (ev, {onPath, title, parents}) => onPath({path: `${parents}/${title}/second`}),
		onThirdClick: (ev, {onPath, title, parents}) => onPath({path: `${parents}/${title}/third`})
	},

	render: ({title, onFirstClick, onSecondClick, onThirdClick, parents, ...rest}) => {
		delete rest.onPath;

		return <Panel {...rest}>
			<Header title={title} />
			<RouteTree />
			<Item>
				{parents}
			</Item>
			<Button onClick={onFirstClick}>First</Button>
			<Button onClick={onSecondClick}>Second</Button>
			<Button onClick={onThirdClick}>Third</Button>
		</Panel>;
	}
});

export default MainPanel;
