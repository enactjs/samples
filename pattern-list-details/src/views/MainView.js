import React from 'react';
import Body from './Body';
import {Header} from '@enact/moonstone/Panels';
import Nav from '../components/Nav';

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

	handleCountryChange = (ev) => {
		const country = ev.target.textContent.toLowerCase();
		this.setState({country: country});
	}

	render () {
		const selectedCountry = this.state.country;
		const onChange = this.handleCountryChange;

		return (
			<div>
				<Header title="City Viewer" type="compact" />
				<Nav
					countryList={countryList}
					onCountryChange={onChange}
					selectedCountry={selectedCountry}
				/>
				<Body selectedCountry={selectedCountry} cities={cities} />
			</div>
		);
	}
}

export default MainView;
