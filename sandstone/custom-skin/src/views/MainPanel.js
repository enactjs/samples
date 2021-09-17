import kind from '@enact/core/kind';
import Scroller from "@enact/sandstone/Scroller";

import SingleField from '../components/SingleField';
import TripleField from '../components/TripleField';
import outputField from "../components/OutputField";
import PropTypes from "prop-types";
import Changeable from "@enact/ui/Changeable";


const MainPanelBase = kind({
	name: 'MainPanel',

	propTypes: {
		Colors: PropTypes.array,
		BGColor: PropTypes.string,
		NTColor: PropTypes.string,
		SCColor: PropTypes.string,
		FTCRed: PropTypes.number,
		FTCGreen: PropTypes.number,
		FTCBlue: PropTypes.number,
		FBColor: PropTypes.string,
		SCRed: PropTypes.number,
		SCGreen: PropTypes.number,
		SCBlue: PropTypes.number,
		SBColor: PropTypes.string,
		OPBCRed: PropTypes.number,
		OPBCGreen: PropTypes.number,
		OPBCBlue: PropTypes.number,
		TOnBColor: PropTypes.string,
		TOColor: PropTypes.string,
		TOffBColor: PropTypes.string,
	},

	defaultProps:{
		BGColor: "red",
		NTColor: "red",
		FTCRed: 255,
		FTCGreen: 0,
		FTCBlue: 0,
	},

	handlers: {
		onChangeInput: ({event, name, color, blue, red, green}, {onChangeInput}) => {
			switch (name) {
				case 'Background color': {
					if(onChangeInput) {
						onChangeInput({BGColor: event.value});
					}
					break;
				}
				case 'Normal Text color': {
					if(onChangeInput) {
						onChangeInput({NTColor: event.value});
					}
					break;
				}
				case 'Focused text color (RGB)': {
					switch (color) {
						case 'red':{
							if(onChangeInput) {
								onChangeInput({FTCRed: event.value, FTCBlue: blue, FTCGreen: green});
							}
							break;
						}
						case 'green':{
							if(onChangeInput) {
								onChangeInput({FTCRed: red, FTCBlue: blue, FTCGreen: event.value});
							}
							break;
						}
						case 'blue':{
							if(onChangeInput) {
								onChangeInput({FTCBlue: event.value, FTCRed: red, FTCGreen: green});
							}
							break;
						}
						default:
							break;
					}
					break;
				}
				default:
					break;
			}
		}
	},

	render: ({onChangeInput, BGColor, NTColor, FTCRed, FTCGreen, FTCBlue, ...props}) => (
		<Scroller>
			<div {...props}>
				<SingleField color={BGColor} propName="Background color" onChangeInput={onChangeInput} />
				<SingleField color={NTColor} propName="Normal Text color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Subtitle color" onChangeInput={onChangeInput} />
				<TripleField red={FTCRed} green={FTCGreen} blue={FTCBlue} propName="Focused text color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Focused Background color" onChangeInput={onChangeInput} />
				<TripleField propName="Selected color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Selected Background Color" onChangeInput={onChangeInput} />
				<TripleField propName="Overlay Panel Background Color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle On Background Color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle Off Color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle Off Background Color" onChangeInput={onChangeInput} />
				<pre>
					{outputField}
				</pre>
			</div>
		</Scroller>
	)
});
const MainPanel = Changeable({prop:'BGColor', change:'onChangeInput'},
	Changeable({prop:'NTColor', change:'onChangeInput'},
	Changeable({prop:'FTCRed', change:'onChangeInput'},
	Changeable({prop:'FTCGreen', change:'onChangeInput'},
	Changeable({prop:'FTCBlue', change:'onChangeInput'},
		MainPanelBase
	)))));
export default MainPanel;
