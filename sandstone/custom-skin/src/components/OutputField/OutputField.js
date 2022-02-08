import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import css from './OutputField.module.less';

import {generateCSS, generateCSSFile} from '../../utils';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const OutputField = kind({
	name: 'OutputField',

	propTypes:{
		colors: PropTypes.array,
		setDefaultState: PropTypes.func,
		skinName: PropTypes.string,
		varNames: PropTypes.array
	},

	handlers:{
		generateFile: (event, {colors, skinName, varNames}) => {
			return generateCSSFile(skinName, generateCSS(colors, skinName, varNames));
		}
	},

	computed: {
		text: ({colors, skinName, varNames}) => {
			return generateCSS(colors, skinName, varNames);
		}
	},

	render: ({generateFile, setDefaultState, text}) => {
		function copyToClipboard () {
			/* global navigator */
			return navigator.clipboard?.writeText(text);
		}

		return (
			<Cell size="90%" className={css.outputField}>
				<pre>
					{text}
				</pre>
				<div className={css.outputBtnContainer}>
					<TooltipButton className={css.outputBtn} css={css} icon="files" minWidth={false} onClick={copyToClipboard} size="small" tooltipText="Copy to clipboard">Copy</TooltipButton>
					<TooltipButton className={css.outputBtn} css={css} icon="download" minWidth={false} onClick={generateFile} size="small" tooltipText="Get CSS file">Download</TooltipButton>
				<TooltipButton className={css.outputBtn} css={css} icon="refresh" minWidth={false} onClick={setDefaultState} size="small" tooltipText="Restore skin to default colors">Reset</TooltipButton> {/* eslint-disable-line */}
				</div>
			</Cell>
		);
	}});

export default OutputField;
