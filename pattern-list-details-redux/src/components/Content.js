import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import IconButton from '@enact/moonstone/IconButton';
import Button from '@enact/moonstone/Button';
import css from './Content.less';

const Content = kind({
	name: 'Content',

	propTypes: {
		selectedCity: PropTypes.string.isRequired,
		onZoom: PropTypes.func.isRequired
	},

	defaultProps: {
		selectedCity: 'San Francisco'
	},

	computed: {
		cityPhoto: ({selectedCity}) => {
			return (
				<Image className={css.image} src={'../images/' + selectedCity.toLowerCase().replace(/\W/g, '') + '.jpg'} />
			);
		}
	},

	render: ({className, cityPhoto, selectedCity, onZoom, ...rest}) => {
		delete rest.zoomIn;
		delete rest.zoomed;

		return (
			<div {...rest} className={className}>
				<div className={css.container}>
					<IconButton
						backgroundOpacity="translucent"
						className={css.maximizePhotoButton}
						onClick={onZoom}
						small
					>
						fullscreen
					</IconButton>
					<Button
						backgroundOpacity="translucent"
						className={css.cityName}
						small
					>
						{selectedCity}
					</Button >
					{cityPhoto}
				</div>
			</div>
		)
	}
});

export default Content;
