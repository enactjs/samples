import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import SingleField from '../SingleField/SingleField';
import TripleField from '../TripleField/TripleField';

const ColorField = kind({
	name: 'ColorField',

	propTypes: {
		color: PropTypes.string,
		disabled: PropTypes.bool,
		index: PropTypes.number,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	render: ({color, disabled, index, onChangeInput, propName, ...rest}) => {
		const tripleField = propName.includes('RGB');
		return (
			tripleField ?
				<TripleField color={color} disabled={disabled} index={index} onChangeInput={onChangeInput} propName={propName} {...rest} /> :
				<SingleField color={color} disabled={disabled} index={index} onChangeInput={onChangeInput} propName={propName} {...rest} />
		);
	}
});

export default ColorField;
