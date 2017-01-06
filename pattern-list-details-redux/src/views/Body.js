import React from 'react';
import kind from '@enact/core/kind';
import SideBarContainer from '../containers/SideBarContainer';
import ContentContainer from '../containers/ContentContainer';
import css from './Body.less';

const Body = kind({
	name: 'Body',

	render: ({cities}) => (
		<div className={css.body}>
			<SideBarContainer cities={cities} className={css.sideBar} />
			<ContentContainer className={css.content} />
		</div>
	)
});

export default Body;
