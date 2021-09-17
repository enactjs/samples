import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {InputField} from '@enact/sandstone/Input';
import BodyText from "@enact/sandstone/BodyText";
import css from './SingleField.module.less';
import PropTypes from 'prop-types';

const SingleField = kind({
	name: 'SingleField',

	handlers: {
		onChangeInput: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name:propName})
		},
	},

	propTypes: {
		onChangeInput: PropTypes.func,
		propName: PropTypes.string,
		color: PropTypes.string,
	},

	defaultProps: {
		color : 'red',
	},

	styles:{
		css,
		className:'singleField'
	},

	render: ({onChangeInput, color, ...rest}) => {
		return(
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{rest.propName}</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInput} />
				<Button disabled className={css.colorButton} style={{backgroundColor:color}} />
			</div>
	)}
});

export default SingleField;
