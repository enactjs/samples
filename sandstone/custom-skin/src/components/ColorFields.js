import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import NameField from './NameField';
import SingleField from './SingleField';
import TripleField from './TripleField';

const ColorFields = kind({
	name: 'ColorFields',

	propTypes:{
		auto:PropTypes.bool,
		AutoColors:PropTypes.array,
		BGColor:PropTypes.string,
		Colors:PropTypes.array,
		name: PropTypes.string,
		NTColor:PropTypes.string,
		onChangeAllInput:PropTypes.func,
		onChangeInput:PropTypes.func
	},

	render:({auto, AutoColors, BGColor, Colors, name, NTColor, onChangeAllInput, onChangeInput, ...rest}) => {
		return (
			<div {...rest}>
				<NameField
					name={name}
					onChangeInput={onChangeInput}
					propName="Skin Name"
				/>
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
					onChangeAllInput={onChangeAllInput}
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
					onChangeAllInput={onChangeAllInput}
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
					onChangeAllInput={onChangeAllInput}
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
			</div>
		);
	}
});

export default ColorFields;
