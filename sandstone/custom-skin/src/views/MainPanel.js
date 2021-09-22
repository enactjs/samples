import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {useState} from 'react';

import AutoPopup from '../components/AutoPopup';
import ColorFields from '../components/ColorFields';
import OutputField from '../components/OutputField';

const MainPanel = () => {
	const [BGColor, setBGColor] = useState('#FF0000');
	const [NTColor, setNTColor] = useState('#FF0000');
	const [SCColor, setSCColor] = useState('#FF0000');
	const [FTCRed, setFTCRed] = useState('255');
	const [FTCGreen, setFTCGreen] = useState('0');
	const [FTCBlue, setFTCBlue] = useState('0');
	const [FBColor, setFBColor] = useState('#FF0000');
	const [SCRed, setSCRed] = useState('255');
	const [SCGreen, setSCGreen] = useState('0');
	const [SCBlue, setSCBlue] = useState('0');
	const [SBColor, setSBColor] = useState('#FF0000');
	const [OPBCRed, setOPBCRed] = useState('255');
	const [OPBCGreen, setOPBCGreen] = useState('0');
	const [OPBCBlue, setOPBCBlue] = useState('0');
	const [TOnBColor, setTOnBColor] = useState('#FF0000');
	const [TOColor, setTOColor] = useState('#FF0000');
	const [TOffBColor, setTOffBColor] = useState('#FF0000');

	const [auto, setAuto] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);

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
		} else {
			setOpenWarning(true);
		}
	}

	const Colors = [SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
		SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor];

	const AutoColors = ['#00FF00', '000', '255', '000', '#00FF00', '000', '255',
		'000', '#00FF00', '000', '255', '000', '#00FF00', '#00FF00', '#00FF00'];

	return (
		<Scroller>
			<div>
				<AutoPopup
					auto={auto}
					openWarning={openWarning}
					setAuto={setAuto}
					setOpenWarning={setOpenWarning}
				/>
				<SwitchItem selected={auto} onClick={onChangeSwitch}>Auto</SwitchItem>
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
