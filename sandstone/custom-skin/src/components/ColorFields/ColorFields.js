import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import ColorField from '../ColorField/ColorField';
import NameField from '../NameField/NameField';

const ColorFields = kind({
	name: 'ColorFields',

	propTypes:{
		auto:PropTypes.bool,
		colors:PropTypes.array,
		name: PropTypes.string,
		onChangeInput:PropTypes.func,
		propNames:PropTypes.array
	},

	render:({auto, colors, name, onChangeInput, propNames, ...rest}) => {
		return (
			<div {...rest}>
				<NameField
					style={{'--sand-focus-bg-color': '#7d848c', color: '#e6e6e6'}}
					name={name}
					onChangeInput={onChangeInput}
					propName="Skin Name"
				/>
				{colors?.map((color, index) => {
					return (
						<ColorField
							color={color}
							disabled={index < 2 ? false : auto}
							index={index}
							key={index}
							onChangeInput={onChangeInput}
							propName={propNames[index]}
						/>
					);
				})}
			</div>
		);
	}
});

export default ColorFields;
