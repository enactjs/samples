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

import {checkColors, generateColors, getColorsFromString, hexColors} from '../utils';

import css from './MainPanel.module.less';

const MainPanel = () => {
	const [skinName, setSkinName] = useState('');
	const [BGColor, setBGColor] = useState('#FFFFFF');
	const [FBColor, setFBColor] = useState('#FFFFFF');
	const [FTCBlue, setFTCBlue] = useState('255');
	const [FTCGreen, setFTCGreen] = useState('255');
	const [FTCRed, setFTCRed] = useState('255');
	const [NTColor, setNTColor] = useState('#FFFFFF');
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

	const Colors = [SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
		SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor];

	const setColors = [setSCColor, setFTCRed, setFTCGreen, setFTCBlue, setFBColor, setSCRed, setSCGreen,
		setSCBlue, setSBColor, setOPBCRed, setOPBCGreen, setOPBCBlue, setTOnBColor, setTOColor, setTOffBColor];

	useEffect(() => {
		if (hexColors(BGColor, NTColor)) {
			setAutoColors(generateColors(NTColor, BGColor));
		}
	}, [BGColor, NTColor]);

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
		const event = props?.event;
		const name = props?.name;
		const color = props?.color;
		const value = event?.value.toUpperCase();

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

	function turnAlertOff () {
		setAlert(false);
	}

	return (
		<Scroller>
			<div className={css.mainPanel}>
				<Heading size="large">Custom skin generator_</Heading>
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
							<Alert className={css.importAlert} css={css} open={alert} type="overlay">
								<BodyText>Wrong type of file imported!</BodyText>
								<Button onClick={turnAlertOff}>Close</Button>
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
								BGColor={BGColor}
								Colors={Colors}
								name={skinName}
								NTColor={NTColor}
								onChangeAllInput={onChangeAllInput}
								onChangeInput={onChangeInput}
							/>
						</Cell>
						<Cell size="30%">
							<Heading>Component Preview</Heading>
							<Column className={css.previewComponents}>
								<Button>Click</Button>
								<Button disabled>Disabled</Button>
								<CheckboxItem label="Here be label!">Checkbox</CheckboxItem>
								<SwitchItem>Toggle</SwitchItem>
								<Slider />
								<RangePicker max={13} min={0} />
								<Dropdown>
									{["Item 1", "Item 2", "Item 3"]}
								</Dropdown>
								<Button onClick={() => setOpenPopup(!openPopup)}>
									Popup
								</Button>
								<Popup open={openPopup} position="right">
									<BodyText>Hello</BodyText>
									<Button onClick={() => setOpenPopup(!openPopup)}>Bye</Button>
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
