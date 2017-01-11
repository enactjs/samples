import React from 'react';
import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import Body from './Body';
import NavContainer from '../containers/NavContainer';

const cities = {
	usa: ['San Francisco', 'Los Angeles', 'New York City'],
	spain: ['Madrid', 'Barcelona', 'Valencia'],
	korea: ['Seoul', 'Busan', 'Daegu'],
	japan: ['Tokyo', 'Osaka', 'Kyoto']
};

const countryList = Object.keys(cities);

const MainView = kind({
	name: 'MainView',

	render: () => (
		<Panel>
			<Header title="City Viewer" type="compact" />
			<NavContainer
				countryList={countryList}
			/>
			<Panel>
				<Body cities={cities} />
			</Panel>
		</Panel>
	)
});

export default MainView;
