import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {InputField} from '@enact/sandstone/Input';
import BodyText from "@enact/sandstone/BodyText";
import css from './TripleField.module.less';
import PropTypes from 'prop-types';

const TripleField = kind({
	name: 'TripleField',

	handlers: {
		onChangeInputR: (event, {onChangeInput, propName, blue, green}) => {
			onChangeInput({event, name:propName, blue, green, color:'red'})
		},
		onChangeInputG: (event, {onChangeInput, propName, blue, red}) => {
			onChangeInput({event, name:propName, blue, red, color:'green'})
		},
		onChangeInputB: (event, {onChangeInput, propName, green, red}) => {
			onChangeInput({event, name:propName, green, red, color:'blue'})
		},
	},

	propTypes: {
		propName: PropTypes.string,
		onChangeInput: PropTypes.func,
		red: PropTypes.string,
		green: PropTypes.string,
		blue: PropTypes.string,
	},

	defaultProps: {
		red : 255,
		green : 0,
		blue : 0,
	},

	styles:{
		css,
		className:'tripleField'
	},

	computed:{
		getColor:({red, green, blue}) => {
			console.log(`rgb(${red}, ${green}, ${blue})`);
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
