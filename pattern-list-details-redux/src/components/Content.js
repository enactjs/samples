import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import IconButton from '@enact/moonstone/IconButton';
import Marquee from '@enact/moonstone/Marquee';
import css from './Content.less';

import barcelona from '../../assets/images/barcelona.jpeg';
import busan from '../../assets/images/busan.jpeg';
import daegu from '../../assets/images/daegu.jpeg';
import kyoto from '../../assets/images/kyoto.jpeg';
import losangeles from '../../assets/images/losangeles.jpeg';
import madrid from '../../assets/images/madrid.jpg';
import newyorkcity from '../../assets/images/newyorkcity.jpg';
import osaka from '../../assets/images/osaka.jpeg';
import sanfrancisco from '../../assets/images/sanfrancisco.jpg';
import seoul from '../../assets/images/seoul.jpeg';
import tokyo from '../../assets/images/tokyo.jpeg';
import valencia from '../../assets/images/valencia.jpg';

const cityPhotos = {
	barcelona,
	busan,
	daegu,
	kyoto,
	losangeles,
	madrid,
	newyorkcity,
	osaka,
	sanfrancisco,
	seoul,
	tokyo,
	valencia
};

const Content = kind({
	name: 'Content',

	propTypes: {
		onZoom: PropTypes.func.isRequired,
		selectedCity: PropTypes.string.isRequired,
		zoomState: PropTypes.bool.isRequired
	},

	styles: {
		css,
		className: 'content'
	},

	handlers: {
		onZoom: (ev, {onZoom, zoomState}) => {
			onZoom(!zoomState);
		}
	},

	computed: {
		cityPhoto: ({selectedCity}) => {
			const cityImgSrc = cityPhotos[selectedCity.toLowerCase().replace(/\W/g, '')];
			return (
				<Image className={css.image} src={cityImgSrc} />
			);
		}
	},

	render: ({cityPhoto, onZoom, selectedCity, ...rest}) => {
		delete rest.zoomState;

		return (
			<div {...rest}>
				<IconButton
					backgroundOpacity="translucent"
					className={css.maximizePhotoButton}
					onClick={onZoom}
					small
				>
					fullscreen
				</IconButton>
				<Marquee className={css.cityName}>
					{selectedCity}
				</Marquee >
				{cityPhoto}
			</div>
		);
	}
});

export default Content;
