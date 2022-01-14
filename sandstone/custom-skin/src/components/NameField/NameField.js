import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import commonCss from '../../common/styles.module.less';
import componentCss from './NameField.module.less';

const NameField = kind({
	name: 'NameField',

	propTypes: {
		name: PropTypes.string,
		onChangeInput: PropTypes.func,
		placeholder: PropTypes.string,
		propName: PropTypes.string
	},

	defaultProps: {
		name : '',
		placeholder : 'Custom Skin'
	},

	styles:{
		css: componentCss,
		className:'nameField'
	},

	handlers: {
		onChangeInputField: (event, {onChangeInput, propName}) => {
			onChangeInput({event, name: propName});
		}
	},

	render: ({css, name, onChangeInputField, placeholder, propName, ...rest}) => {
		delete rest.onChangeInput;

		return (
			<Layout className={commonCss.inputField}>
				<Cell size="40%">
					<BodyText className={commonCss.labelField} css={css}>{propName}</BodyText>
				</Cell>
				<Cell>
					<InputField
						{...rest}
						css={css}
						onChange={onChangeInputField}
						placeholder={placeholder}
						value={name}
					/>
				</Cell>
			</Layout>
		);
	}
});

export default NameField;
