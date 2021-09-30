import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {useEffect, useState} from 'react';

import AutoPopup from '../components/AutoPopup';
import ColorFields from '../components/ColorFields';
import ImportSkin from '../components/ImportSkin';
import OutputField from '../components/OutputField';

import {checkColors, generateColors, getColorsFromString, hexColors} from '../utils';

const MainPanel = () => {
	const [skinName, setSkinName] = useState('');
	const [BGColor, setBGColor] = useState('#FF0000');
	const [FBColor, setFBColor] = useState('#FF0000');
	const [FTCBlue, setFTCBlue] = useState('0');
	const [FTCGreen, setFTCGreen] = useState('0');
	const [FTCRed, setFTCRed] = useState('255');
	const [NTColor, setNTColor] = useState('#00FF00');
	const [OPBCBlue, setOPBCBlue] = useState('0');
	const [OPBCGreen, setOPBCGreen] = useState('0');
	const [OPBCRed, setOPBCRed] = useState('255');
	const [SBColor, setSBColor] = useState('#FF0000');
	const [SCBlue, setSCBlue] = useState('0');
	const [SCColor, setSCColor] = useState('#FF0000');
	const [SCGreen, setSCGreen] = useState('0');
	const [SCRed, setSCRed] = useState('255');
	const [TOColor, setTOColor] = useState('#FF0000');
	const [TOffBColor, setTOffBColor] = useState('#FF0000');
	const [TOnBColor, setTOnBColor] = useState('#FF0000');

	const [alert, setAlert] = useState(false);
	const [auto, setAuto] = useState(true);
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
	}, [BGColor, NTColor, alert]);

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

	function onChangeInput (props) {
		const event = props?.event;
		const name = props?.name;
		const color = props?.color;
		const value = event?.value;

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
			<div>
				<Alert open={alert} type="overlay">
					<p>Wrong type of file imported!</p>
					<Button onClick={turnAlertOff}>Close</Button>
				</Alert>
				<ImportSkin setColors={setColorsFromImport} />
				<AutoPopup
					auto={auto}
					openWarning={openWarning}
					setAuto={setAuto}
					setColorsToAuto={setColorsToAuto}
					setOpenWarning={setOpenWarning}
				/>
				<SwitchItem inline selected={auto} onClick={onChangeSwitch}>Auto</SwitchItem>
				<ColorFields
					auto={auto}
					AutoColors={AutoColors}
					BGColor={BGColor}
					Colors={Colors}
					name={skinName}
					NTColor={NTColor}
					onChangeInput={onChangeInput}
				/>
				<OutputField
					colors={
						!auto ? [skinName, BGColor, NTColor, ...Colors] : [skinName, BGColor, NTColor, ...AutoColors]
					}
				/>
			</div>
		</Scroller>
	);
};

export default MainPanel;
