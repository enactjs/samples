import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import css from './SingleField.module.less';

const SingleField = kind({
	name: 'SingleField',

	handlers: {
		onChangeInputField: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name:propName});
		}
	},

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

	render: ({onChangeInputField, color, ...rest}) => {
		return (
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{rest.propName}</BodyText>
				<Button disabled className={css.colorButton} style={{backgroundColor:color}} />
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputField} />
			</div>
		);
	}
});

export default SingleField;
