import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import ColorPicker from '../ColorPicker/ColorPicker';

import {convertHexToRGB, convertRGBToHex} from '../../utils';

import componentCss from './TripleField.module.less';
import css from '../../common/styles.module.less';

const TripleField = kind({
	name: 'TripleField',

	propTypes: {
		color: PropTypes.string,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	defaultProps: {
		color: '#FFFFFF'
	},

	styles:{
		css,
		className:'tripleField'
	},

	handlers: {
		onChangeInput: (event, {onChangeInput, propName}) => {
			onChangeInput({event: event.target, name: propName});
		},
		onChangeInputB: (event, {color, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([colors[0], colors[1], newColor])}, name: propName});
		},
		onChangeInputG: (event, {color, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([colors[0], newColor, colors[2]])}, name: propName});
		},
		onChangeInputR: (event, {color, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([newColor, colors[1], colors[2]])}, name: propName});
		}
	},

	render: ({color, onChangeInput, onChangeInputB, onChangeInputG, onChangeInputR, propName, ...rest}) => {
		const colors = convertHexToRGB(color);

		delete rest.onChangeInput;

		return (
			<Layout className={css.inputField}>
				<Cell size="40%">
					<BodyText className={css.labelField}>{propName}</BodyText>
				</Cell>
				<Cell shrink>
					<ColorPicker onChange={onChangeInput} color={color} {...rest} />
				</Cell>
				<Cell className={componentCss.tripleField}>
					<span className={componentCss.tripleText}>R:</span>
					<InputField {...rest} className={componentCss.tripleInput} onChange={onChangeInputR} value={colors[0]} />
					<span className={componentCss.tripleText}>G:</span>
					<InputField {...rest} className={componentCss.tripleInput} onChange={onChangeInputG} value={colors[1]} />
					<span className={componentCss.tripleText}>B:</span>
					<InputField {...rest} className={componentCss.tripleInput} onChange={onChangeInputB} value={colors[2]} />
				</Cell>
			</Layout>
		);
	}
});

export default TripleField;
