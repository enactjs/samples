import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import PropTypes from 'prop-types';

import css from './OutputField.module.less';

import {generateCSS, generateCSSFile} from '../../utils';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const OutputField = kind({
	name: 'OutputField',

	propTypes:{
		colors: PropTypes.array,
		setDefaultState: PropTypes.func
	},

	handlers:{
		generateFile: (event, {colors}) => {
			return generateCSSFile(generateCSS(colors));
		}
	},

	computed: {
		text: ({colors}) => {
			return generateCSS(colors);
		}
	},

	render: ({generateFile, setDefaultState, text}) => {
		function copyToClipboard () {
			/* global navigator */
			return navigator.clipboard?.writeText(text);
		}

		return (
			<div className={css.outputField}>
				<pre>
					{text}
				</pre>
				<TooltipButton className={css.copyBtn} icon="files" onClick={copyToClipboard} size="small" tooltipText="Copy to clipboard">Copy</TooltipButton>
				<TooltipButton className={css.copyBtn} icon="download" onClick={generateFile} size="small" tooltipText="Get CSS file">Download Skin</TooltipButton>
				<TooltipButton className={css.copyBtn} onClick={setDefaultState} size="small" tooltipText="Restore skin to default colors">Back to Default</TooltipButton>
			</div>
		);
	}});

export default OutputField;
