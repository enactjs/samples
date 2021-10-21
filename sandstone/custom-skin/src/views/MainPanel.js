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

import AutoPopup from '../components/AutoPopup';
import ColorFields from '../components/ColorFields';
import ImportSkin from '../components/ImportSkin';
import OutputField from '../components/OutputField';

import {checkColors, generateColors, getColorsFromString, hexColors, sendData} from '../utils';

import styles from '../common/styles.module.less';
import css from './MainPanel.module.less';

// eslint-disable-next-line
import skin from '../../file-generator/custom_skin.css';

window.CUSTOM_SKIN = 'custom';

const MainPanel = () => {
	const [skinName, setSkinName] = useState('');
	const [BGColor, setBGColor] = useState('#855D94');
	const [FBColor, setFBColor] = useState('#FFFFFF');
	const [FTCBlue, setFTCBlue] = useState('255');
	const [FTCGreen, setFTCGreen] = useState('255');
	const [FTCRed, setFTCRed] = useState('255');
	const [NTColor, setNTColor] = useState('#FB9039');
	const [OPBCBlue, setOPBCBlue] = useState('255');
	const [OPBCGreen, setOPBCGreen] = useState('255');
	const [OPBCRed, setOPBCRed] = useState('255');
	const [SBColor, setSBColor] = useState('#FFFFFF');
	const [SCBlue, setSCBlue] = useState('255');
	const [SCColor, setSCColor] = useState('#FFFFFF');
	const [SCGreen, setSCGreen] = useState('255');
	const [SCRed, setSCRed] = useState('255');
	const [TOColor, setTOColor] = useState('#FFFFFF');
	const [TOffBColor, setTOffBColor] = useState('#FFFFFF');
	const [TOnBColor, setTOnBColor] = useState('#FFFFFF');

	const [alert, setAlert] = useState(false);
	const [auto, setAuto] = useState(true);
	const [openPopup, setOpenPopup] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);
	const [AutoColors, setAutoColors] = useState([]);

	// eslint-disable-next-line
	const Colors = [SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
		SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor];

	const setColors = [setSCColor, setFTCRed, setFTCGreen, setFTCBlue, setFBColor, setSCRed, setSCGreen,
		setSCBlue, setSBColor, setOPBCRed, setOPBCGreen, setOPBCBlue, setTOnBColor, setTOColor, setTOffBColor];

	useEffect(() => {
		if (hexColors(BGColor, NTColor)) {
			setAutoColors(generateColors(NTColor, BGColor));
		}
	}, [BGColor, NTColor]);

	useEffect(() => {
		if (AutoColors.length !== 0) {
			sendData(auto ? AutoColors : Colors, skinName, NTColor, BGColor);
		}
	}, [auto, AutoColors, BGColor, Colors, NTColor, skinName]);

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
					case 'background-color': {
						setBGColor(set[1]);
						break;
					}
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
						setFTCRed(colorsRGB[0]);
						setFTCGreen(colorsRGB[1]);
						setFTCBlue(colorsRGB[2]);
						break;
					}
					case '--sand-focus-bg-color': {
						setFBColor(set[1]);
						break;
					}
					case '--sand-selected-color-rgb': {
						const colorsRGB = set[1].split(',');
						setSCRed(colorsRGB[0]);
						setSCGreen(colorsRGB[1]);
						setSCBlue(colorsRGB[2]);
						break;
					}
					case '--sand-selected-bg-color': {
						setSBColor(set[1]);
						break;
					}
					case '--sand-overlay-bg-color-rgb': {
						const colorsRGB = set[1].split(',');
						setOPBCRed(colorsRGB[0]);
						setOPBCGreen(colorsRGB[1]);
						setOPBCBlue(colorsRGB[2]);
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

	function onChangeAllInput (props) {
		const name = props?.name;
		const colors = props?.colors;
		switch (name) {
			case 'Focused text color (RGB)': {
				setFTCRed(colors[0]);
				setFTCGreen(colors[1]);
				setFTCBlue(colors[2]);
				break;
			}
			case 'Selected color (RGB)': {
				setSCRed(colors[0]);
				setSCGreen(colors[1]);
				setSCBlue(colors[2]);
				break;
			}
			case 'Overlay Panel Background Color (RGB)': {
				setOPBCRed(colors[0]);
				setOPBCGreen(colors[1]);
				setOPBCBlue(colors[2]);
				break;
			}
			default: break;
		}
	}

	function onChangeInput (props) {
		const color = props?.color;
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
			case 'Background color': {
				setBGColor(value);
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
				switch (color) {
					case 'red' : {
						setFTCRed(value);
						break;
					}
					case 'green': {
						setFTCGreen(value);
						break;
					}
					case 'blue': {
						setFTCBlue(value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Focused Background color': {
				setFBColor(value);
				break;
			}
			case 'Selected color (RGB)': {
				switch (color) {
					case 'red' : {
						setSCRed(value);
						break;
					}
					case 'green': {
						setSCGreen(value);
						break;
					}
					case 'blue': {
						setSCBlue(value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Selected Background Color': {
				setSBColor(value);
				break;
			}
			case 'Overlay Panel Background Color (RGB)': {
				switch (color) {
					case 'red' : {
						setOPBCRed(value);
						break;
					}
					case 'green': {
						setOPBCGreen(value);
						break;
					}
					case 'blue': {
						setOPBCBlue(value);
						break;
					}
					default:
						break;
				}
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

	return (
		<Scroller>
			<div className={css.mainPanel}>
				<Heading className={css.appTitle} size="large" skin="neutral">Custom skin generator_</Heading>
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
							<Alert className={styles.customAlert} open={alert} skin="neutral" type="overlay">
								<BodyText centered size="small" skin="neutral">Wrong type of file imported!</BodyText>
								<Button onClick={turnAlertOff} size="small" skin="neutral">Close</Button>
							</Alert>
							<Row>
								<Cell>
									<ImportSkin setColors={setColorsFromImport} />
								</Cell>
								<Cell>
									<BodyText className={css.switchLabel} skin="neutral">Generate colors automatically</BodyText>
									<Switch className={css.switchControl} onClick={onChangeSwitch} selected={auto} skin="neutral" />
								</Cell>
							</Row>
							<ColorFields
								auto={auto}
								AutoColors={AutoColors}
								BGColor={BGColor}
								Colors={Colors}
								name={skinName}
								NTColor={NTColor}
								onChangeAllInput={onChangeAllInput}
								onChangeInput={onChangeInput}
							/>
						</Cell>
						<Cell size="35%" className={css.previewSection}>
							<Column className={css.previewComponents}>
								<Heading className={css.previewTitle} showLine>Live DEMO</Heading>
								<Row className={css.previewButtons}>
									<Button>Click</Button>
									<Button disabled>Disabled</Button>
								</Row>
								<Row className={css.previewButtons}>
									<Button selected>Selected</Button>
									<Button disabled selected>Disabled</Button>
								</Row>
								<CheckboxItem label="Here be label!">Checkbox</CheckboxItem>
								<SwitchItem>Toggle</SwitchItem>
								<Slider />
								<RangePicker defaultValue={0} max={13} min={0} />
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
					</Row>
					<Row>
						<OutputField
							colors={
								!auto ? [skinName, BGColor, NTColor, ...Colors] : [skinName, BGColor, NTColor, ...AutoColors]
							}
						/>
					</Row>
				</Layout>
			</div>
		</Scroller>
	);
};

export default MainPanel;
