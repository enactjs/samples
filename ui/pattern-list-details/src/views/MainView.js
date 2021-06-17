import Heading from '@enact/ui/Heading';
import {Component} from 'react';

import Nav from '../components/Nav';

import Body from './Body';

import css from './MainView.module.less';

const cities = {
	usa: ['San Francisco', 'Los Angeles', 'New York City'],
	spain: ['Madrid', 'Barcelona', 'Valencia'],
	korea: ['Seoul', 'Busan', 'Daegu'],
	japan: ['Tokyo', 'Osaka', 'Kyoto']
};

const countryList = Object.keys(cities);

class MainView extends Component {
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
			<div {...this.props} className={css.main}>
				<Heading size="title">
					<div className={css.heading}>
						City Viewer
						<div>
							<Nav
								countryList={countryList}
								defaultSelected={0}
								onCountryChange={onChange}
							/>
						</div>
					</div>
				</Heading>
				<Body cities={cities} selectedCountry={selectedCountry} />
			</div>
		);
	}
}

export default MainView;
