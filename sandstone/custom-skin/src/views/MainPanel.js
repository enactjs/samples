import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Dropdown from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import RangePicker from '@enact/sandstone/RangePicker';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import {useEffect, useState} from 'react';

import AutoPopup from '../components/AutoPopup/AutoPopup';
import ColorFields from '../components/ColorFields/ColorFields';
import ImportSkin from '../components/ImportSkin/ImportSkin';
import OutputField from '../components/OutputField/OutputField';

import {
	checkColors,
	convertRGBToHex,
	generateCSS,
	generateColors,
	getColorsFromString,
	hexColors
} from '../utils';

import styles from '../common/styles.module.less';
import css from './MainPanel.module.less';

const MainPanel = () => {
	const [skinName, setSkinName] = useState('');
	const [FBColor, setFBColor] = useState('#FFFFFF');
	const [FTColor, setFTColor] = useState('#FFFFFF');
	const [NTColor, setNTColor] = useState('#FB9039');
	const [OPBColor, setOPBColor] = useState('#855D94');
	const [SBColor, setSBColor] = useState('#FFFFFF');
	const [SCColor, setSCColor] = useState('#FFFFFF');
	const [SColor, setSColor] = useState('#FFFFFF');
	const [TOColor, setTOColor] = useState('#FFFFFF');
	const [TOffBColor, setTOffBColor] = useState('#FFFFFF');
	const [TOnBColor, setTOnBColor] = useState('#FFFFFF');

	const [alert, setAlert] = useState(false);
	const [auto, setAuto] = useState(true);
	const [openPopup, setOpenPopup] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);
	const [AutoColors, setAutoColors] = useState([]);

	// eslint-disable-next-line
	const Colors = [SCColor, FTColor, FBColor, SColor, SBColor, TOnBColor, TOColor, TOffBColor];

	const setColors = [setSCColor, setFTColor, setFBColor, setSColor, setSBColor, setTOnBColor, setTOColor, setTOffBColor];

	useEffect(() => {
		if (hexColors(OPBColor, NTColor)) {
			setAutoColors(generateColors(NTColor, OPBColor));
		}
	}, [OPBColor, NTColor]);

	function setColorsToAuto () {
		for (let i = 0; i < setColors.length; ++i) {
			setColors[i](AutoColors[i]);
		}
	}

	function setColorsFromImport (colors) {
		const colorSet = getColorsFromString(colors);
		if (colorSet !== null) {
			setSkinName(colorSet.shift()[1]);
			setAuto(false);
			colorSet.forEach(set => {
				switch (set[0]) {
					case '--sand-text-color': {
						setNTColor(set[1]);
						break;
					}
					case '--sand-text-sub-color': {
						setSCColor(set[1]);
						break;
					}
					case '--sand-focus-text-color-rgb': {
						const colorsRGB = set[1].split(',');
						setFTColor(convertRGBToHex([parseInt(colorsRGB[0]), parseInt(colorsRGB[1]), parseInt(colorsRGB[2])]));
						break;
					}
					case '--sand-focus-bg-color': {
						setFBColor(set[1]);
						break;
					}
					case '--sand-selected-color-rgb': {
						const colorsRGB = set[1].split(',');
						setSColor(convertRGBToHex([parseInt(colorsRGB[0]), parseInt(colorsRGB[1]), parseInt(colorsRGB[2])]));
						break;
					}
					case '--sand-selected-bg-color': {
						setSBColor(set[1]);
						break;
					}
					case '--sand-overlay-bg-color-rgb': {
						const colorsRGB = set[1].split(',');
						setOPBColor(convertRGBToHex([parseInt(colorsRGB[0]), parseInt(colorsRGB[1]), parseInt(colorsRGB[2])]));
						break;
					}
					case '--sand-toggle-on-bg-color': {
						setTOnBColor(set[1]);
						break;
					}
					case '--sand-toggle-off-color': {
						setTOColor(set[1]);
						break;
					}
					case '--sand-toggle-off-bg-color': {
						setTOffBColor(set[1]);
						break;
					}
					default: break;
				}
			});
		} else {
			setAlert(true);
		}
	}

	function onChangeInput (props) {
		const event = props?.event;
		const name = props?.name;
		let value = event?.value;

		if (name !== 'Skin Name') {
			value = value.toUpperCase();
		}

		switch (name) {
			case 'Skin Name': {
				setSkinName(value);
				break;
			}
			case 'Normal Text color': {
				setNTColor(value);
				break;
			}
			case 'Subtitle color': {
				setSCColor(value);
				break;
			}
			case 'Focused text color (RGB)': {
				setFTColor(value);
				break;
			}
			case 'Focused Background color': {
				setFBColor(value);
				break;
			}
			case 'Selected color (RGB)': {
				setSColor(value);
				break;
			}
			case 'Selected Background Color': {
				setSBColor(value);
				break;
			}
			case 'Overlay Panel Background Color (RGB)': {
				setOPBColor(value);
				break;
			}
			case 'Toggle On Background Color': {
				setTOnBColor(value);
				break;
			}
			case 'Toggle Off Color': {
				setTOColor(value);
				break;
			}
			case 'Toggle Off Background Color': {
				setTOffBColor(value);
				break;
			}
			default: break;
		}
	}

	function onChangeSwitch () {
		if (auto) {
			setAuto(!auto);
			setColorsToAuto();
		} else {
			// eslint-disable-next-line
			if (!checkColors(Colors, AutoColors)) {
				setOpenWarning(true);
			} else {
				setAuto(!auto);
			}
		}
	}

	function handleOpenPopup () {
		setOpenPopup(!openPopup);
	}

	function turnAlertOff () {
		setAlert(false);
	}

	function setDefaultState () {
		setAuto(true);
		setNTColor('#FB9039');
		setOPBColor('#855D94');
	}

	const sheet = document.createElement('style');
	const rest = auto ? AutoColors : Colors;
	sheet.innerHTML = generateCSS([skinName, OPBColor, NTColor, ...rest]);
	document.body?.appendChild(sheet);

	return (
		<Layout className={css.mainPanel}>
			<Cell className={css.customizeSection}>
				<Scroller>
					<Heading className={css.appTitle} size="large">Custom skin generator_</Heading>
					<Layout orientation="vertical">
						<Row>
							<Cell>
								<AutoPopup
									auto={auto}
									openWarning={openWarning}
									setAuto={setAuto}
									setColorsToAuto={setColorsToAuto}
									setOpenWarning={setOpenWarning}
								/>
								<Alert className={styles.customAlert} open={alert} type="overlay">
									<BodyText centered size="small">Wrong type of file imported!</BodyText>
									<Button onClick={turnAlertOff} size="small">Close</Button>
								</Alert>
								<Row>
									<Cell>
										<ImportSkin setColors={setColorsFromImport} />
									</Cell>
									<Cell>
										<BodyText className={css.switchLabel}>Generate colors automatically</BodyText>
										<Switch className={css.switchControl} onClick={onChangeSwitch} selected={auto} />
									</Cell>
								</Row>
								<ColorFields
									auto={auto}
									AutoColors={AutoColors}
									OPBColor={OPBColor}
									Colors={Colors}
									name={skinName}
									NTColor={NTColor}
									onChangeInput={onChangeInput}
								/>
							</Cell>
						</Row>
						<Row>
							<OutputField
								colors={
									!auto ? [skinName, OPBColor, NTColor, ...Colors] : [skinName, OPBColor, NTColor, ...AutoColors]
								}
								setDefaultState={setDefaultState}
							/>
						</Row>
					</Layout>
				</Scroller>
			</Cell>
			<Cell size="30%" className={css.previewSection}>
				<Column className={css.previewComponents}>
					<Heading className={css.previewTitle}>Live DEMO</Heading>
					<Row className={css.previewButtons}>
						<Button>Click</Button>
						<Button disabled>Disabled</Button>
					</Row>
					<Row className={css.previewButtons}>
						<Button selected>Selected</Button>
						<Button disabled selected>Disabled</Button>
					</Row>
					<CheckboxItem className={css.previewCheckboxItem} label="Here be label!">Checkbox</CheckboxItem>
					<SwitchItem className={css.previewSwitchItem}>Toggle</SwitchItem>
					<Slider className={css.previewSlider} />
					<RangePicker className={css.previewRangePicker} defaultValue={0} max={13} min={0} />
					<Dropdown className={css.previewDropdown}>
						{['Item 1', 'Item 2', 'Item 3']}
					</Dropdown>
					<Button className={css.previewPopup} onClick={handleOpenPopup}>
						Popup
					</Button>
					<Popup open={openPopup} position="right">
						<BodyText centered>Hello</BodyText>
						<Button onClick={handleOpenPopup}>Bye</Button>
					</Popup>
				</Column>
			</Cell>
		</Layout>
	);
};

export default MainPanel;
