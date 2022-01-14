import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import ColorPicker from '../ColorPicker/ColorPicker';

import {convertHexToRGB, convertRGBToHex} from '../../utils';

import commonCss from '../../common/styles.module.less';
import componentCss from './TripleField.module.less';

const TripleField = kind({
	name: 'TripleField',

	propTypes: {
		color: PropTypes.string,
		index: PropTypes.number,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	defaultProps: {
		color: '#FFFFFF'
	},

	styles:{
		css: componentCss,
		className:'tripleField'
	},

	handlers: {
		onChangeInput: (event, {index, onChangeInput, propName}) => {
			onChangeInput({event: event.target, name: propName, index: index});
		},
		onChangeInputB: (event, {color, index, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([colors[0], colors[1], newColor])}, name: propName, index: index});
		},
		onChangeInputG: (event, {color, index, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([colors[0], newColor, colors[2]])}, name: propName, index: index});
		},
		onChangeInputR: (event, {color, index, onChangeInput, propName}) => {
			const colors = convertHexToRGB(color);
			const newColor = event.value ? parseInt(event.value) : 0;
			onChangeInput({event: {value: convertRGBToHex([newColor, colors[1], colors[2]])}, name: propName, index: index});
		}
	},

	render: ({color, css, onChangeInput, onChangeInputB, onChangeInputG, onChangeInputR, propName, ...rest}) => {
		delete rest.onChangeInput;
		delete rest.index;

		const colors = convertHexToRGB(color);

		return (
			<Layout className={commonCss.inputField}>
				<Cell size="40%">
					<BodyText className={commonCss.labelField}>{propName}</BodyText>
				</Cell>
				<Cell shrink>
					<ColorPicker onChange={onChangeInput} color={color} {...rest} />
				</Cell>
				<Cell className={css.tripleField}>
					<Cell>
						<span className={css.tripleText}>R:</span>
						<InputField {...rest} className={css.redInput} css={css} onChange={onChangeInputR} value={colors[0]} />
					</Cell>
					<Cell>
						<span className={css.tripleText}>G:</span>
						<InputField {...rest} className={css.greenInput} css={css} onChange={onChangeInputG} value={colors[1]} />
					</Cell>
					<Cell>
						<span className={css.tripleText}>B:</span>
						<InputField {...rest} className={css.blueInput} css={css} onChange={onChangeInputB} value={colors[2]} />
					</Cell>
				</Cell>
			</Layout>
		);
	}
});

export default TripleField;
