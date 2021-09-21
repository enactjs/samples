import Scroller from '@enact/sandstone/Scroller';
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

	const Colors = [BGColor, NTColor, SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
		SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor];

	return (
		<Scroller>
			<div>
				<SingleField color={BGColor} onChangeInput={onChangeInput} propName="Background color" />
				<SingleField color={NTColor} onChangeInput={onChangeInput} propName="Normal Text color" />
				<SingleField color={SCColor} onChangeInput={onChangeInput} propName="Subtitle color" />
				<TripleField blue={FTCBlue} green={FTCGreen} red={FTCRed} onChangeInput={onChangeInput} propName="Focused text color (RGB)" />
				<SingleField color={FBColor} onChangeInput={onChangeInput} propName="Focused Background color" />
				<TripleField blue={SCBlue} green={SCGreen} red={SCRed} onChangeInput={onChangeInput} propName="Selected color (RGB)" />
				<SingleField color={SBColor} onChangeInput={onChangeInput} propName="Selected Background Color" />
				<TripleField blue={OPBCBlue} green={OPBCGreen} red={OPBCRed} onChangeInput={onChangeInput} propName="Overlay Panel Background Color (RGB)" />
				<SingleField color={TOnBColor} onChangeInput={onChangeInput} propName="Toggle On Background Color" />
				<SingleField color={TOColor} onChangeInput={onChangeInput} propName="Toggle Off Color" />
				<SingleField color={TOffBColor} onChangeInput={onChangeInput} propName="Toggle Off Background Color" />
				<OutputField colors={Colors} />
			</div>
		</Scroller>
	);
};

export default MainPanel;
