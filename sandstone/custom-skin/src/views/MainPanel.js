import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {useEffect, useState} from 'react';

import AutoPopup from '../components/AutoPopup';
import ColorFields from '../components/ColorFields';
import OutputField from '../components/OutputField';

import {checkColors, generateColors, hexColors} from '../utils';

const MainPanel = () => {
	const [BGColor, setBGColor] = useState('#FF0000');
	const [FBColor, setFBColor] = useState('#FF0000');
	const [FTCBlue, setFTCBlue] = useState('0');
	const [FTCGreen, setFTCGreen] = useState('0');
	const [FTCRed, setFTCRed] = useState('255');
	const [NTColor, setNTColor] = useState('#FF0000');
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
	}, [BGColor, NTColor]);

	function setColorsToAuto () {
		for (let i = 0; i < setColors.length; ++i) {
			setColors[i](AutoColors[i]);
		}
	}

	function onChangeInput (props) {
		const event = props?.event;
		const name = props?.name;
		const color = props?.color;
		const value = event?.value;

		switch (name) {
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

	return (
		<Scroller>
			<div>
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
					NTColor={NTColor}
					onChangeInput={onChangeInput}
				/>
				<OutputField colors={!auto ? [BGColor, NTColor, ...Colors] : [BGColor, NTColor, ...AutoColors]} />
			</div>
		</Scroller>
	);
};

export default MainPanel;
