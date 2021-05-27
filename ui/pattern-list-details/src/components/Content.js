import kind from '@enact/core/kind';
import Icon from '@enact/ui/Icon';
import Image from '@enact/ui/Image';
import Marquee from '@enact/ui/Marquee';
import PropTypes from 'prop-types';

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

import css from './Content.module.less';

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
		zoom: PropTypes.bool
	},

	styles: {
		css,
		className: 'content'
	},

	computed: {
		className: ({zoom, styler}) => styler.append({zoom}),
		cityPhoto: ({selectedCity}) => {
			if (selectedCity) {
				const cityImgSrc = cityPhotos[selectedCity.toLowerCase().replace(/\W/g, '')];
				return (
					<Image className={css.image} src={cityImgSrc} />
				);
			}
		}
	},

	render: ({cityPhoto, onZoom, selectedCity, zoom, ...rest}) => (
		<div {...rest}>
			<Icon
				className={css.maximizePhotoButton}
				onClick={onZoom}
				selected={zoom}
				style={{paddingLeft: '12px', fontSize: '48px', cursor: 'pointer'}}
			>
				{zoom ? '0x0002D' : '0x0002B'}
			</Icon>
			<Marquee className={css.cityName}>
				{selectedCity}
			</Marquee>
			{cityPhoto}
		</div>
	)
});

export default Content;
