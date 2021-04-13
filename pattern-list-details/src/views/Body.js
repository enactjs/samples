import PropTypes from 'prop-types';
import React from 'react';
import {Row, Cell} from '@enact/ui/Layout';

import Content from '../components/Content';
import SideBar from '../components/SideBar';

import css from './Body.module.less';

class Body extends React.Component {
	static propTypes = {
		selectedCountry: PropTypes.string.isRequired,
		cities: PropTypes.object
	};

	constructor (props) {
		super(props);
		this.state = {
			city: this.props.cities['usa'][0],
			zoom: false
		};
	}

	UNSAFE_componentWillReceiveProps (nextProps) {
		const nextCity = this.props.cities[nextProps.selectedCountry][0];
		this.setState({city: nextCity});
	}

	handleCityChange = ({data: city}) => this.setState({city});

	handleZoom = () => {
		this.setState(({zoom}) => ({zoom: !zoom}));
	};

	render () {
		const {cities, selectedCountry, ...rest} = this.props;
		const selectedCity = this.state.city;

		return (
			<Row className={css.body} {...rest}>
				<Cell
					size="30%"
					component={SideBar}
					className={css.sidebar}
					cities={cities}
					defaultSelected={0}
					onCityChange={this.handleCityChange}
					selectedCountry={selectedCountry}
				/>
				<Cell className={css.content}>
					<Content
						selectedCity={selectedCity}
						onZoom={this.handleZoom}
						zoom={this.state.zoom}
					/>
				</Cell>
			</Row>
		);
	}
}

export default Body;
