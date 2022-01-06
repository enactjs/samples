import {Row, Cell} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Slider from '@enact/sandstone/Slider';
import {useState} from 'react';

import {convertHexToHSL, hexColors, convertHSLToHex} from '../../utils';

import css from '../../common/styles.module.less';
import componentCss from './ColorPicker.module.less';

const ColorPicker = (props) => {
	const {color, disabled, onChange} = props || null;
	const {h, s, l} = hexColors(color, '#ffffff') ? convertHexToHSL(color) : convertHexToHSL('#ffffff');
	const [open, setOpen] = useState(false);

	function closePopup () {
		setOpen(false);
	}

	function changeHue (ev) {
		onChange({target: {value: convertHSLToHex(parseInt(ev.value), s, l)}});
	}

	function changeLightness (ev) {
		onChange({target: {value: convertHSLToHex(h, s, parseInt(ev.value))}});
	}

	function changeSaturation (ev) {
		onChange({target: {value: convertHSLToHex(h, parseInt(ev.value), l)}});
	}

	function keyPress (ev) {
		if (ev.key === 'Enter' || ev.key === 'Escape') {
			setOpen(false);
		}
	}

	function openPopup () {
		setOpen(true);
	}

	return (
		<div>
			<Button
				className={css.colorBlock}
				disabled={disabled}
				onClick={openPopup}
				style={{
					backgroundColor: color,
					'--sand-focus-bg-color': color
				}}
				type="color"
			/>
			<Popup
				className={componentCss.colorPickerPanel}
				disabled={disabled}
				onClose={closePopup}
				onKeyPress={keyPress}
				open={open}
				position="top"
				scrimType="transparent"
			>
				<Row align="center">
					<Cell aria-label="Hue" role="region">
						<label>Hue</label>
						<Slider aria-label="Degree" value={h} min={0} max={360} onChange={changeHue} />
					</Cell>
					<Cell component="label" size="5ex">{h + '˚'}</Cell>
				</Row>
				<Row align="center">
					<Cell aria-label="Saturation" role="region">
						<label>Saturation</label>
						<Slider aria-label="Percent" value={s} min={0} max={100} onChange={changeSaturation} />
					</Cell>
					<Cell component="label" size="5ex">{s + '%'}</Cell>
				</Row>
				<Row align="center">
					<Cell aria-label="Lightness" role="region">
						<label>Lightness</label>
						<Slider aria-label="Percent" value={l} min={0} max={100} onChange={changeLightness} />
					</Cell>
					<Cell component="label" size="5ex">{l + '%'}</Cell>
				</Row>
				<Button
					className={componentCss.coloredButton}
					style={{backgroundColor: color, '--sand-focus-bg-color': color}}
				/>
			</Popup>
		</div>
	);
};

export default ColorPicker;
