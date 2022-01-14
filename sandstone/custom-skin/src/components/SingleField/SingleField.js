import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import ColorPicker from '../ColorPicker/ColorPicker';

import commonCss from '../../common/styles.module.less';
import componentCss from './SingleField.module.less';

const SingleField = kind({
	name: 'SingleField',

	propTypes: {
		color: PropTypes.string,
		index: PropTypes.number,
		onChangeInput: PropTypes.func,
		propName: PropTypes.string
	},

	defaultProps: {
		color : '#FB9039'
	},

	styles:{
		css: componentCss,
		className:'singleField'
	},

	handlers: {
		onChangeInputField: (event, {index, onChangeInput, propName}) => {
			onChangeInput({event, name: propName, index: index});
		},
		onChangeInput: (event, {index, onChangeInput, propName}) => {
			onChangeInput({event: event.target, name: propName, index: index});
		}
	},

	render: ({color, css, onChangeInput, onChangeInputField, propName, ...rest}) => {
		delete rest.onChangeInput;
		delete rest.index;

		return (
			<Layout className={commonCss.inputField}>
				<Cell size="40%">
					<BodyText className={commonCss.labelField}>{propName}</BodyText>
				</Cell>
				<Cell className={componentCss.singleField}>
					<ColorPicker {...rest} color={color} onChange={onChangeInput} />
					<InputField {...rest} className={css.singleInput} css={css} onChange={onChangeInputField} value={color} />
				</Cell>
			</Layout>
		);
	}
});

export default SingleField;
