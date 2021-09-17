import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {InputField} from '@enact/sandstone/Input';
import BodyText from "@enact/sandstone/BodyText";
import css from './TripleField.module.less';
import PropTypes from 'prop-types';

const TripleField = kind({
	name: 'TripleField',

	handlers: {
		onChangeInputR: (event) => ({red: event.value}),
		onChangeInputG: (event) => ({green: event.value}),
		onChangeInputB: (event) => ({blue: event.value}),
	},

	propTypes: {
		propName: PropTypes.string,
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

	render: ({onChangeInputR, onChangeInputG, onChangeInputB, red, green, blue, ...rest}) => {
		return(
			<div className={css.contentContainer}>
				<BodyText className={css.bodyText}>{rest.propName}</BodyText>
				<BodyText className={css.bodyTextLetter}>R:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputR} />
				<BodyText className={css.bodyTextLetter}>G:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputG} />
				<BodyText className={css.bodyTextLetter}>B:</BodyText>
				<InputField size={'large'} className={css.inputField} onChange={onChangeInputB} />
				<Button disabled className={css.colorButton} style={{backgroundColor:`rgb(${red}, ${green}, ${blue})`}} />
			</div>
		)}
});

export default TripleField;
