import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Slider from '@enact/sandstone/Slider';
import {Row, Cell} from '@enact/ui/Layout';
import {useState} from 'react';

import {convertHexToRGB, convertRGBToHex, hexColors} from '../../utils';

import css from '../../common/styles.module.less';
import componentCss from './ColorPicker.module.less';

const ColorPicker = (props) => {
	const {color, disabled, onChange} = props || null;
	const [red, green, blue] = hexColors(color, '#ffffff') ? convertHexToRGB(color) : convertHexToRGB('#ffffff');
	const [open, setOpen] = useState(false);

	function closePopup () {
		setOpen(false);
	}

	function changeRed (ev) {
		onChange({target: {value: convertRGBToHex([parseInt(ev.value), green, blue])}});
	}

	function changeBlue (ev) {
		onChange({target: {value: convertRGBToHex([red, green, parseInt(ev.value)])}});
	}

	function changeGreen (ev) {
		onChange({target: {value: convertRGBToHex([red, parseInt(ev.value), blue])}});
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
					<Cell aria-label="Red" role="region">
						<label>Red</label>
						<Slider value={red} min={0} max={255} onChange={changeRed} />
					</Cell>
					<Cell component="label" size="5ex">{red}</Cell>
				</Row>
				<Row align="center">
					<Cell aria-label="Green" role="region">
						<label>Green</label>
						<Slider value={green} min={0} max={255} onChange={changeGreen} />
					</Cell>
					<Cell component="label" size="5ex">{green}</Cell>
				</Row>
				<Row align="center">
					<Cell aria-label="Lightness" role="region">
						<label>Blue</label>
						<Slider value={blue} min={0} max={255} onChange={changeBlue} />
					</Cell>
					<Cell component="label" size="5ex">{blue}</Cell>
				</Row>
				<Row align="center">
					<div className={componentCss.coloredButton} style={{backgroundColor: color}} />
				</Row>
			</Popup>
		</div>
	);
};

export default ColorPicker;
