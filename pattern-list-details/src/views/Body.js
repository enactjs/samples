import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import css from './Body.less';

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

	componentWillReceiveProps (nextProps) {
		const nextCity = this.props.cities[nextProps.selectedCountry][0];
		this.setState({city: nextCity});
	}

	handleCityChange = ({value}) => {
		this.setState({city: value});
	}

	handleZoom = () => {
		this.setState({zoom: !this.state.zoom});
	}

	render () {
		const cities = this.props.cities;
		const onChange = this.handleCityChange;
		const onZoom = this.handleZoom;
		const selectedCity = this.state.city;
		const selectedCountry = this.props.selectedCountry;
		const zoom = this.state.zoom;

		return (
			<div className={css.body}>
				<SideBar
					cities={cities}
					onCityChange={onChange}
					selectedCity={selectedCity}
					selectedCountry={selectedCountry}
					zoom={zoom}
				/>
				<Content
					className={css.content}
					selectedCity={selectedCity}
					onZoom={onZoom}
				/>
			</div>
		);
	}
}

export default Body;
