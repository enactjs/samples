import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import PropTypes from 'prop-types';

import css from './OutputField.module.less';

import {generateCSS, generateCSSFile} from '../utils';


const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const OutputField = kind({
	name: 'OutputField',

	propTypes:{
		colors: PropTypes.array
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

	render: ({generateFile, text}) => {
		function copyToClipboard () {
			/* global navigator */
			return navigator.clipboard?.writeText(text);
		}

		return (
			<div className={css.outputField}>
				<pre>
					{text}
				</pre>
				<TooltipButton className={css.copyBtn} icon="files" onClick={copyToClipboard} size="small" skin="neutral" tooltipText="Copy to clipboard">Copy</TooltipButton>
				<TooltipButton className={css.copyBtn} icon="files" onClick={generateFile} size="small" skin="neutral" tooltipText="Get CSS file">Generate CSS</TooltipButton>
			</div>
		);
	}});

export default OutputField;
