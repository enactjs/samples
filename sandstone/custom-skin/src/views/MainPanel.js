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
	},

	handlers: {
		onChangeInput: ({event, name}, {onChangeInput}) => {
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
				default:
					break;
			}
		}
	},

	render: ({onChangeInput, BGColor, NTColor, ...props}) => (
		<Scroller>
			<div {...props}>
				<SingleField color={BGColor} propName="Background color" onChangeInput={onChangeInput} />
				<SingleField color={NTColor} propName="Normal Text color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Subtitle color" onChangeInput={onChangeInput} />
				<TripleField propName="Focused text color (RGB)" onChangeInput={onChangeInput} />
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
const MainPanel = Changeable({prop:'BGColor', change:'onChangeInput'}, Changeable({prop:'NTColor', change:'onChangeInput'}, MainPanelBase));
export default MainPanel;
