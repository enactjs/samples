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
		handleScrollTop: PropTypes.func,
		setDefaultState: PropTypes.func,
		skinName: PropTypes.string,
		varNames: PropTypes.array
	},

	handlers:{
		generateFile: (event, {colors, skinName, varNames}) => {
			return generateCSSFile(generateCSS(colors, skinName, varNames));
		}
	},

	computed: {
		text: ({colors, skinName, varNames}) => {
			return generateCSS(colors, skinName, varNames);
		}
	},

	render: ({generateFile, handleScrollTop, setDefaultState, text}) => {
		function copyToClipboard () {
			/* global navigator */
			return navigator.clipboard?.writeText(text);
		}

		return (
			<div className={css.outputField}>
				<pre>
					{text}
				</pre>
				<TooltipButton className={css.copyBtn} css={css} icon="files" onClick={copyToClipboard} size="small" tooltipText="Copy to clipboard">Copy</TooltipButton>
				<TooltipButton className={css.downloadBtn} css={css} icon="download" onClick={generateFile} size="small" tooltipText="Get CSS file">Download</TooltipButton>
				<TooltipButton className={css.resetBtn} css={css} icon="refresh" onClick={setDefaultState} size="small" tooltipText="Restore skin to default colors">Reset</TooltipButton> {/* eslint-disable-line */}
				<TooltipButton className={css.scrollBtn} css={css} icon="arrowlargeup" onClick={handleScrollTop} size="small" tooltipText="Scroll back to top of page">Back to top</TooltipButton>
			</div>
		);
	}});

export default OutputField;
