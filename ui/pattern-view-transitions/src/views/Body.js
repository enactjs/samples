import {Cell, Row} from '@enact/ui/Layout';
import {flushSync} from 'react-dom';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import Content from '../components/Content';
import SideBar from '../components/SideBar';

import css from './Body.module.less';

const Body = ({cities, selectedCountry, ...rest}) => {
	const [city, setCity] = useState(cities['usa'][0]);
	const [zoom, setZoom] = useState(false);

	useEffect(() => {
		const nextCity = cities[selectedCountry][0];
		setCity(nextCity);
	}, [cities, selectedCountry]);

	const handleCityChange = useCallback(({data: selectedCity}) => {
		document.startViewTransition(() => {
			flushSync(() => {
				setCity(selectedCity);
			});
		});
	}, []);

	const handleZoom = useCallback(() => {
		document.startViewTransition(() => {
			flushSync(() => {
				setZoom(!zoom);
			});
		});
	}, [zoom]);

	return (
		<Row {...rest} className={css.body}>
			<Cell
				cities={cities}
				className={css.sidebar}
				component={SideBar}
				defaultSelected={0}
				onCityChange={handleCityChange}
				selectedCountry={selectedCountry}
				size="30%"
			/>
			<Cell>
				<Content
					className={css.content}
					onZoom={handleZoom}
					selectedCity={city}
					zoom={zoom}
				/>
			</Cell>
		</Row>
	);
};

Body.propTypes = {
	selectedCountry: PropTypes.string.isRequired,
	cities: PropTypes.object
};

export default Body;
