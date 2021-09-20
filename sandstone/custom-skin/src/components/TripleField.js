import kind from '@enact/core/kind';
import BodyText from "@enact/sandstone/BodyText";
import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';

import css from './TripleField.module.less';

const TripleField = kind({
	name: 'TripleField',

	handlers: {
		onChangeInputB: (event, {onChangeInput, propName, green, red}) => {
			onChangeInput({event, name:propName, green, red, color:'blue'})
		},
		onChangeInputG: (event, {onChangeInput, propName, blue, red}) => {
			onChangeInput({event, name:propName, blue, red, color:'green'})
		},
		onChangeInputR: (event, {onChangeInput, propName, blue, green}) => {
			onChangeInput({event, name:propName, blue, green, color:'red'})
		}
	},

	propTypes: {
		blue: PropTypes.number,
		green: PropTypes.number,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string,
		red: PropTypes.number
	},

	defaultProps: {
		blue : 0,
		green : 0,
		red : 255
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

	render: ({onChangeInputR, onChangeInputG, onChangeInputB, getColor, ...rest}) => {
		return(
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{rest.propName}</BodyText>
				<Button disabled className={css.colorButton} style={{backgroundColor:getColor}} />
				<BodyText className={css.bodyTextLetter}>R:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputR} />
				<BodyText className={css.bodyTextLetter}>G:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputG} />
				<BodyText className={css.bodyTextLetter}>B:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputB} />
			</div>
		)}
});

export default TripleField;
