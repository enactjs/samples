import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import {convertHexToRGB, convertRGBToHex} from '../utils';

import componentCss from './TripleField.module.less';
import css from '../common/styles.module.less';

const TripleField = kind({
	name: 'TripleField',

	propTypes: {
		blue: PropTypes.string,
		green: PropTypes.string,
		onChangeAllInput: PropTypes.func,
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
		getColorValue:({red, green, blue}) => {
			return convertRGBToHex([parseInt(red), parseInt(green), parseInt(blue)]);
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
		},
		getColorFromPicker: (event, {propName, onChangeAllInput}) => {
			const RGB = convertHexToRGB(event.target.value);
			onChangeAllInput({name: propName, colors: RGB});
		}
	},

	render: ({blue, getColorFromPicker, getColorValue, green, onChangeInputB, onChangeInputG, onChangeInputR, propName, red, ...rest}) => {
		return (
			<Layout className={css.inputField}>
				<Cell size="40%">
					<BodyText skin="neutral" className={css.labelField}>{propName}</BodyText>
				</Cell>
				<Cell shrink>
					<input {...rest} className={css.colorBlock} onChange={getColorFromPicker} style={{backgroundColor: getColorValue}} type="color" value={getColorValue} />
				</Cell>
				<Cell className={componentCss.tripleField}>
					<span className={componentCss.tripleText}>R:</span>
					<InputField skin="neutral" {...rest} className={componentCss.tripleInput} value={red} onChange={onChangeInputR} />
					<span className={componentCss.tripleText}>G:</span>
					<InputField skin="neutral" {...rest} className={componentCss.tripleInput} value={green} onChange={onChangeInputG} />
					<span className={componentCss.tripleText}>B:</span>
					<InputField skin="neutral" {...rest} className={componentCss.tripleInput} value={blue} onChange={onChangeInputB} />
				</Cell>
			</Layout>
		);
	}
});

export default TripleField;
