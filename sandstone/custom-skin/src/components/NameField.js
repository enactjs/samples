import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import css from './NameField.module.less';

const NameField = kind({
	name: 'NameField',

	propTypes: {
		name: PropTypes.string,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	defaultProps: {
		name : 'red'
	},

	styles:{
		css,
		className:'nameField'
	},

	handlers: {
		onChangeInputField: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name:propName});
		}
	},

	render: ({name, onChangeInputField, propName, ...rest}) => {
		return (
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{propName}</BodyText>
				<InputField {...rest} className={css.inputField} onChange={onChangeInputField} size={'large'} value={name} />
			</div>
		);
	}
});

export default NameField;
