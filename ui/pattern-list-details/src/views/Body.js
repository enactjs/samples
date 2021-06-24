import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {Component} from 'react';

import Content from '../components/Content';
import SideBar from '../components/SideBar';

import css from './Body.module.less';

class Body extends Component {
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
			<Row {...rest} className={css.body}>
				<Cell
					cities={cities}
					className={css.sidebar}
					component={SideBar}
					defaultSelected={0}
					onCityChange={this.handleCityChange}
					selectedCountry={selectedCountry}
					size="30%"
				/>
				<Cell className={css.content}>
					<Content
						onZoom={this.handleZoom}
						selectedCity={selectedCity}
						zoom={this.state.zoom}
					/>
				</Cell>
			</Row>
		);
	}
}

export default Body;
