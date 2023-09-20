import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button, {ButtonBase} from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Popup from '@enact/sandstone/Popup';
import Skinnable from '@enact/sandstone/Skinnable';
import Slider from '@enact/sandstone/Slider';
import Spottable from '@enact/spotlight/Spottable';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useEffect, useState} from 'react';

import {hexToHSL, HSLToHex} from '../../hooks/utils';

import componentCss from './ColorPicker.module.less';

const SpottableButton = Spottable(ButtonBase);

const PopupContent = ({color, colorHandler, css}) => {
	const [hue, setHue] = useState(0);
	const [saturation, setSaturation] = useState(0);
	const [lightness, setLightness] = useState(0);

	useEffect(() => {
		let {h, s, l} = hexToHSL(color);

		setHue(h);
		setSaturation(s);
		setLightness(l);
	}, [color]);

	const changeHue = useCallback((ev) => {
		setHue(ev.value);
	}, []);

	const changeLightness = useCallback((ev) => {
		setLightness(ev.value);
	}, []);

	const changeSaturation = useCallback((ev) => {
		setSaturation(ev.value);
	}, []);

	const onSliderValueChange = useCallback(() => {
		colorHandler(HSLToHex({h: hue, s: saturation, l: lightness}));
	}, [colorHandler, hue, lightness, saturation]);

	return (
		<Cell className={css.colorPicker}>
			<div className={css.colorsRow}>
				<Column className={css.colorPickerSliders}>
					<BodyText className={css.colorSliderText} css={css}>Hue {hue}</BodyText>
					<Slider
						className={css.colorSlider}
						max={356}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeHue}
						value={hue}
					/>
					<BodyText className={css.colorSliderText} css={css}>Saturation {saturation}%</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeSaturation}
						value={saturation}
					/>
					<BodyText className={css.colorSliderText} css={css}>Lightness {lightness}%</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onClick={onSliderValueChange}
						onChange={changeLightness}
						value={lightness}
					/>
				</Column>
				<div className={css.coloredDiv} style={{backgroundColor: `hsl(${hue} ,${saturation}%, ${lightness}%)`}} />
			</div>
		</Cell>
	);
};

PopupContent.propTypes = {
	color: PropTypes.string,

	colorHandler: PropTypes.func,

	css: PropTypes.object,

	presetColors: PropTypes.array
};

const ColorPickerBase = kind({
	name: 'ColorPicker',

	functional: true,

	propTypes: {
		color: PropTypes.string,

		colorHandler: PropTypes.func,

		css: PropTypes.object,

		disabled: PropTypes.bool,

		onTogglePopup: PropTypes.func,

		popupOpen: PropTypes.bool,

		text: PropTypes.string
	},

	defaultProps: {
		disabled: false,
		popupOpen: false
	},

	handlers: {
		handleClosePopup: (ev, {onTogglePopup}) => {
			onTogglePopup();
		},
		handleOpenPopup: (ev, {disabled, onTogglePopup}) => {
			if (!disabled) {
				onTogglePopup();
			}
		}
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	render: ({color, colorHandler, css, disabled, handleClosePopup, handleOpenPopup, popupOpen, text, ...rest}) => {
		delete rest.onTogglePopup;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const CloseIcon = useCallback((props) => <Icon {...props} css={css} />, [css]);
		const slotAfter = <SpottableButton
			className={css.coloredButton}
			disabled={disabled}
			onClick={handleOpenPopup}
			style={{backgroundColor: color}}
			type="color"
		/>;

		return (
			<Cell shrink className={css.colorPicker}>
				<Item disabled={disabled} onClick={handleOpenPopup} slotAfter={slotAfter} {...rest}>
					{text}
				</Item>
				<Popup
					className={css.colorPopup}
					css={css}
					noAnimation
					onClose={handleClosePopup}
					open={disabled ? false : popupOpen}
					position="left"
					scrimType="transparent"
				>
					<Row>
						<Cell align="center">
							<BodyText className={css.colorPopupHeader} css={css} noWrap>{text}</BodyText>
						</Cell>
						<Cell align="right" shrink>
							<Button className={css.closeButton} css={css} iconComponent={CloseIcon} icon="closex" onClick={handleClosePopup} size="small" />
						</Cell>
					</Row>
					<PopupContent color={color} colorHandler={colorHandler} css={css} />
				</Popup>
			</Cell>
		);
	}
});

const ColorPickerDecorator = compose(
	Skinnable,
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

const ColorPicker = ColorPickerDecorator(ColorPickerBase);

export default ColorPicker;
