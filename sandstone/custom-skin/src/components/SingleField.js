import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import css from './SingleField.module.less';

const SingleField = kind({
	name: 'SingleField',

	propTypes: {
		color: PropTypes.string,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	defaultProps: {
		color : 'red'
	},

	styles:{
		css,
		className:'singleField'
	},

	handlers: {
		onChangeInputField: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name:propName});
		}
	},

	render: ({color, onChangeInputField, propName,...rest}) => {
		return (
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{propName}</BodyText>
				<Button className={css.colorButton} disabled style={{backgroundColor:color}} />
				<InputField {...rest} className={css.inputField} onChange={onChangeInputField} size={'large'} value={color} />
			</div>
		);
	}
});

export default SingleField;
