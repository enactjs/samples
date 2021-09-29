import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import css from './TripleField.module.less';

const TripleField = kind({
	name: 'TripleField',

	propTypes: {
		blue: PropTypes.string,
		green: PropTypes.string,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string,
		red: PropTypes.string
	},

	defaultProps: {
		blue : '0',
		green : '0',
		red : '255'
	},

	styles:{
		css,
		className:'tripleField'
	},

	computed:{
		getColor:({red, green, blue}) => {
			return `rgb(${red}, ${green}, ${blue})`;
		}
	},

	handlers: {
		onChangeInputB: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name: propName, color: 'blue'});
		},
		onChangeInputG: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name: propName, color: 'green'});
		},
		onChangeInputR: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name: propName, color: 'red'});
		}
	},

	render: ({blue, getColor, green, onChangeInputB, onChangeInputG, onChangeInputR, propName, red, ...rest}) => {

		return (
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{propName}</BodyText>
				<Button disabled className={css.colorButton} style={{backgroundColor:getColor}} />
				<BodyText className={css.bodyTextLetter}>R:</BodyText>
				<InputField {...rest} value={red} size={'large'} className={css.inputField} onChange={onChangeInputR} />
				<BodyText className={css.bodyTextLetter}>G:</BodyText>
				<InputField {...rest} value={green} size={'large'} className={css.inputField} onChange={onChangeInputG} />
				<BodyText className={css.bodyTextLetter}>B:</BodyText>
				<InputField {...rest} value={blue} size={'large'} className={css.inputField} onChange={onChangeInputB} />
			</div>
		);
	}
});

export default TripleField;
