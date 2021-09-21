import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {useState} from 'react';

import OutputField from '../components/OutputField';
import SingleField from '../components/SingleField';
import TripleField from '../components/TripleField';

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
	const [openWarning, setOpenWarning]=useState(false);

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
		if(auto) {
			setAuto(!auto);
		}
		else {
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
				<Popup open={openWarning}>
					<BodyText>Do you want to switch from manual to auto?</BodyText>
					<Button onClick={() => {
						setAuto(!auto);
						setOpenWarning(false);
					}}>Yes</Button>
					<Button onClick={() => {
						setOpenWarning(false);
					}}>No</Button>
				</Popup>
				<SwitchItem selected={auto} onClick={onChangeSwitch}>Auto</SwitchItem>
				<SingleField
					color={BGColor}
					onChangeInput={onChangeInput}
					propName="Background color"
				/>
				<SingleField
					color={NTColor}
					onChangeInput={onChangeInput}
					propName="Normal Text color"
				/>
				<SingleField
					color={!auto ? Colors[0] : AutoColors[0]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Subtitle color"
				/>
				<TripleField
					blue={!auto ? Colors[3] : AutoColors[3]}
					disabled={auto}
					green={!auto ? Colors[2] : AutoColors[2]}
					red={!auto ? Colors[1] : AutoColors[1]}
					onChangeInput={onChangeInput}
					propName="Focused text color (RGB)"
				/>
				<SingleField
					color={!auto ? Colors[4] : AutoColors[4]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Focused Background color"
				/>
				<TripleField
					blue={!auto ? Colors[7] : AutoColors[7]}
					disabled={auto}
					green={!auto ? Colors[6] : AutoColors[6]}
					red={!auto ? Colors[5] : AutoColors[5]}
					onChangeInput={onChangeInput}
					propName="Selected color (RGB)"
				/>
				<SingleField
					color={!auto ? Colors[8] : AutoColors[8]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Selected Background Color"
				/>
				<TripleField
					blue={!auto ? Colors[11] : AutoColors[11]}
					disabled={auto}
					green={!auto ? Colors[10] : AutoColors[10]}
					red={!auto ? Colors[9] : AutoColors[9]}
					onChangeInput={onChangeInput}
					propName="Overlay Panel Background Color (RGB)"
				/>
				<SingleField
					color={!auto ? Colors[12] : AutoColors[12]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle On Background Color"
				/>
				<SingleField
					color={!auto ? Colors[13] : AutoColors[13]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle Off Color"
				/>
				<SingleField
					color={!auto ? Colors[14] : AutoColors[14]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle Off Background Color"
				/>
				<OutputField colors={!auto ? [BGColor, NTColor, ...Colors] : [BGColor, NTColor, ...AutoColors]} />
			</div>
		</Scroller>
	);
};

export default MainPanel;
