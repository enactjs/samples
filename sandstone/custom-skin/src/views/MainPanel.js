import Scroller from "@enact/sandstone/Scroller";
import {useState} from "react";

import OutputField from "../components/OutputField";
import SingleField from '../components/SingleField';
import TripleField from '../components/TripleField';


const MainPanel = () => {
	const [BGColor, setBGColor] = useState('#FF0000');
	const [NTColor, setNTColor] = useState('#FF0000');
	const [SCColor, setSCColor] = useState('#FF0000');
	const [FTCRed, setFTCRed] = useState(255);
	const [FTCGreen, setFTCGreen] = useState(0);
	const [FTCBlue, setFTCBlue] = useState(0);
	const [FBColor, setFBColor] = useState('#FF0000');
	const [SCRed, setSCRed] = useState(255);
	const [SCGreen, setSCGreen] = useState(0);
	const [SCBlue, setSCBlue] = useState(0);
	const [SBColor, setSBColor] = useState('#FF0000');
	const [OPBCRed, setOPBCRed] = useState(255);
	const [OPBCGreen, setOPBCGreen] = useState(0);
	const [OPBCBlue, setOPBCBlue] = useState(0);
	const [TOnBColor, setTOnBColor] = useState('#FF0000');
	const [TOColor, setTOColor] = useState('#FF0000');
	const [TOffBColor, setTOffBColor] = useState('#FF0000');

	function onChangeInput (props) {
		switch (props.name){
			case 'Background color':{
				setBGColor(props.event.value);
				break;
			}
			case 'Normal Text color':{
				setNTColor(props.event.value);
				break;
			}
			case 'Subtitle color':{
				setSCColor(props.event.value);
				break;
			}
			case 'Focused text color (RGB)':{
				switch (props.color){
					case 'red' :{
						setFTCRed(props.event.value);
						break;
					}
					case 'green':{
						setFTCGreen(props.event.value);
						break;
					}
					case 'blue':{
						setFTCBlue(props.event.value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Focused Background color':{
				setFBColor(props.event.value);
				break;
			}
			case 'Selected color (RGB)':{
				switch (props.color){
					case 'red' :{
						setSCRed(props.event.value);
						break;
					}
					case 'green':{
						setSCGreen(props.event.value);
						break;
					}
					case 'blue':{
						setSCBlue(props.event.value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Selected Background Color':{
				setSBColor(props.event.value);
				break;
			}
			case 'Overlay Panel Background Color (RGB)':{
				switch (props.color){
					case 'red' :{
						setOPBCRed(props.event.value);
						break;
					}
					case 'green':{
						setOPBCGreen(props.event.value);
						break;
					}
					case 'blue':{
						setOPBCBlue(props.event.value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Toggle On Background Color':{
				setTOnBColor(props.event.value);
				break;
			}
			case 'Toggle Off Color':{
				setTOColor(props.event.value);
				break;
			}
			case 'Toggle Off Background Color':{
				setTOffBColor(props.event.value);
				break;
			}
			default: break;
		}
	}

	return(
		<Scroller>
			<div>
				<SingleField color={BGColor} propName="Background color" onChangeInput={onChangeInput} />
				<SingleField color={NTColor} propName="Normal Text color" onChangeInput={onChangeInput} />
				<SingleField color={SCColor} propName="Subtitle color" onChangeInput={onChangeInput} />
				<TripleField red={FTCRed} green={FTCGreen} blue={FTCBlue} propName="Focused text color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color={FBColor} propName="Focused Background color" onChangeInput={onChangeInput} />
				<TripleField red={SCRed} green={SCGreen} blue={SCBlue} propName="Selected color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color={SBColor} propName="Selected Background Color" onChangeInput={onChangeInput} />
				<TripleField red={OPBCRed} green={OPBCGreen} blue={OPBCBlue} propName="Overlay Panel Background Color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color={TOnBColor} propName="Toggle On Background Color" onChangeInput={onChangeInput} />
				<SingleField color={TOColor} propName="Toggle Off Color" onChangeInput={onChangeInput} />
				<SingleField color={TOffBColor} propName="Toggle Off Background Color" onChangeInput={onChangeInput} />
				<OutputField colors={[BGColor, NTColor, SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
					SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor]} />
			</div>
		</Scroller>
	)
};

export default MainPanel;
