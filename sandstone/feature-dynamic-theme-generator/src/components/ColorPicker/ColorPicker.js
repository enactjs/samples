/**
 * A Sandstone component that allows the user to choose a color.
 *
 * @example
 * <ColorPicker
 *	 color={'#FF00FF'}
 *	 colorHandler={setColor}
 *	 text={'Color Picker'}
 * />
 *
 * @module sandstone/ColorPicker
 * @exports ColorPicker
 * @exports ColorPickerBase
 * @exports ColorPickerDecorator
 * @private
 */

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

/**
 * A component that contains the content for the {@link sandstone/ColorPicker|ColorPicker} popup.
 *
 * @class PopupContent
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
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
						onChange={changeHue}
						onClick={onSliderValueChange}
						value={hue}
					/>
					<BodyText className={css.colorSliderText} css={css}>Saturation {saturation}%</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onChange={changeSaturation}
						onClick={onSliderValueChange}
						value={saturation}
					/>
					<BodyText className={css.colorSliderText} css={css}>Lightness {lightness}%</BodyText>
					<Slider
						className={css.colorSlider}
						max={100}
						min={0}
						onBlur={onSliderValueChange}
						onChange={changeLightness}
						onClick={onSliderValueChange}
						value={lightness}
					/>
				</Column>
				<div className={css.coloredDiv} style={{backgroundColor: `hsl(${hue} ,${saturation}%, ${lightness}%)`}} />
			</div>
		</Cell>
	);
};

PopupContent.propTypes = {
	/**
	 * Indicates the color.
	 *
	 * @type {String}
	 * @private
	 */
	color: PropTypes.string,

	/**
	 * Called when color is modified.
	 *
	 * @type {Function}
	 * @private
	 */
	colorHandler: PropTypes.func,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * `colorPicker` - The root class name
	 * `coloredDiv`  - A class name used for a single div
	 *
	 * @type {Object}
	 * @private
	 */
	css: PropTypes.object,

	/**
	 * Contains an array with a couple of possible preset colors.
	 *
	 * @type {Array}
	 * @private
	 */
	presetColors: PropTypes.array
};

/**
 * The color picker base component which sets-up the component's structure.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within {@link sandstone/ColorPicker|ColorPicker}.
 *
 * @class ColorPickerBase
 * @memberof sandstone/ColorPicker
 * @ui
 * @private
 */
const ColorPickerBase = kind({
	name: 'ColorPicker',

	functional: true,

	propTypes: {
		/**
		 * Indicates the color.
		 *
		 * @type {String}
		 * @private
		 */
		color: PropTypes.string,

		/**
		 * Called when color is modified.
		 *
		 * @type {Function}
		 * @private
		 */
		colorHandler: PropTypes.func,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * `colorPicker` - The root class name
		 * `colorPopup`  - A class name used for the popup
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Applies the `disabled` class.
		 *
		 * When `true`, the color picker is shown as disabled.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Called to open or close the color picker.
		 *
		 * @type {Function}
		 * @public
		 */
		onTogglePopup: PropTypes.func,

		/**
		 * Indicates if the color picker is open.
		 *
		 * When `true`, contextual popup opens.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		popupOpen: PropTypes.bool,

		/**
		 * Contains the text that shows next to the color picker.
		 *
		 * @type {String}
		 * @public
		 */
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
					skin="neutral"
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

/**
 * Applies Sandstone specific behaviors to {@link sandstone/ColorPicker.ColorPickerBase|ColorPicker} components.
 *
 * @hoc
 * @memberof sandstone/ColorPicker
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Toggleable.Toggleable
 * @private
 */
const ColorPickerDecorator = compose(
	Skinnable,
	Toggleable({prop: 'popupOpen', toggle: 'onTogglePopup'})
);

/**
 * A color picker component, ready to use in Sandstone applications.
 *
 * @class ColorPicker
 * @memberof sandstone/ColorPicker
 * @extends sandstone/ColorPicker.ColorPickerBase
 * @mixes sandstone/ColorPicker.ColorPickerDecorator
 * @ui
 * @private
 */
const ColorPicker = ColorPickerDecorator(ColorPickerBase);

export default ColorPicker;
