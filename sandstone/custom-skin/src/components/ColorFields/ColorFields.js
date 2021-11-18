import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import NameField from '../NameField/NameField';
import SingleField from '../SingleField/SingleField';
import TripleField from '../TripleField/TripleField';

const ColorFields = kind({
	name: 'ColorFields',

	propTypes:{
		auto:PropTypes.bool,
		AutoColors:PropTypes.array,
		OPBColor:PropTypes.string,
		Colors:PropTypes.array,
		name: PropTypes.string,
		NTColor:PropTypes.string,
		onChangeInput:PropTypes.func
	},

	render:({auto, AutoColors, Colors, name, NTColor, onChangeInput, OPBColor, ...rest}) => {
		return (
			<div {...rest}>
				<NameField
					name={name}
					onChangeInput={onChangeInput}
					propName="Skin Name"
				/>
				<TripleField
					color={OPBColor}
					onChangeInput={onChangeInput}
					propName="Overlay Panel Background Color (RGB)"
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
					color={!auto ? Colors[1] : AutoColors[1]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Focused text color (RGB)"
				/>
				<SingleField
					color={!auto ? Colors[2] : AutoColors[2]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Focused Background color"
				/>
				<TripleField
					color={!auto ? Colors[3] : AutoColors[3]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Selected color (RGB)"
				/>
				<SingleField
					color={!auto ? Colors[4] : AutoColors[4]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Selected Background Color"
				/>
				<SingleField
					color={!auto ? Colors[5] : AutoColors[5]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle On Background Color"
				/>
				<SingleField
					color={!auto ? Colors[6] : AutoColors[6]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle Off Color"
				/>
				<SingleField
					color={!auto ? Colors[7] : AutoColors[7]}
					disabled={auto}
					onChangeInput={onChangeInput}
					propName="Toggle Off Background Color"
				/>
			</div>
		);
	}
});

export default ColorFields;
