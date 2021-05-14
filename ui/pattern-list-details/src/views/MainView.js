import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';

import Nav from '../components/Nav';
import Body from './Body';

const cities = {
	usa: ['San Francisco', 'Los Angeles', 'New York City'],
	spain: ['Madrid', 'Barcelona', 'Valencia'],
	korea: ['Seoul', 'Busan', 'Daegu'],
	japan: ['Tokyo', 'Osaka', 'Kyoto']
};

const countryList = Object.keys(cities);

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {country: countryList[0]};
	}

	handleCountryChange = ({data: country}) => {
		country = country.toLowerCase();
		this.setState({country});
	};

	render () {
		const selectedCountry = this.state.country;
		const onChange = this.handleCountryChange;

		return (
			<Panel {...this.props}>
				<Header type="compact">
					<title>City Viewer</title>
					<Nav
						countryList={countryList}
						onCountryChange={onChange}
						defaultSelected={0}
					/>
				</Header>
				<Body selectedCountry={selectedCountry} cities={cities} />
			</Panel>
		);
	}
}

export default MainView;
