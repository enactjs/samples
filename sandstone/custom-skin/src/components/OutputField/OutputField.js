/* eslint-disable react/jsx-no-bind */

import kind from '@enact/core/kind';
import platform from '@enact/core/platform';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import Toggleable from '@enact/ui/Toggleable';
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
		onToggleOpen: PropTypes.func,
		popupOpen: PropTypes.bool,
		setDefaultState: PropTypes.func,
		skinName: PropTypes.string,
		varNames: PropTypes.array
	},

	handlers:{
		generateFile: (event, {colors, skinName, varNames}) => {
			return generateCSSFile(skinName, generateCSS(colors, skinName, varNames));
		},
		handleClose: () => {
			if (typeof document !== 'undefined') {
				document.querySelector('#temporaryStylesheet')?.remove();
			}
		},
		handleFocus: () => {
			if (typeof document !== 'undefined') {
				const sheet = document.createElement('style');
				sheet.id = 'temporaryStylesheet';
				sheet.innerHTML = `.sandstone-theme {
					--sand-component-focus-text-color-rgb: 76, 80, 89;
					--sand-focus-bg-color-rgb: 230, 230, 230;
					--sand-shadow-color-rgb: none;
				}`;
				document.body?.appendChild(sheet);
			}
		},
		handleOpen: (ev, {onToggleOpen}) => {
			if (typeof document !== 'undefined') {
				const sheet = document.createElement('style');
				sheet.id = 'temporaryStylesheet';
				sheet.innerHTML = `.sandstone-theme {
					--sand-focus-bg-color-rgb: 230, 230, 230;
					--sand-progress-bg-color-rgb: 55, 58, 65;
					--sand-progress-color-rgb: 230, 230, 230;
					--sand-overlay-bg-color-rgb: 87, 94, 102;
					--sand-shadow-color-rgb: none;
				}`;
				document.body?.appendChild(sheet);
				onToggleOpen();
			}
		}
	},

	computed: {
		text: ({colors, skinName, varNames}) => {
			return generateCSS(colors, skinName, varNames);
		}
	},

	render: ({generateFile, handleClose, handleFocus, handleOpen, onToggleOpen, popupOpen, setDefaultState, text}) => {
		function copyToClipboard () {
			/* global navigator */
			return navigator.clipboard?.writeText(text);
		}

		return (
			<Cell size="90%" className={css.outputField}>
				<Popup onClose={onToggleOpen} onHide={handleClose} open={popupOpen} spotlightRestrict="self-only">
					<Scroller focusableScrollbar>
						<pre className={css.outputData}>
							{text}
						</pre>
					</Scroller>
				</Popup>
				<div className={css.outputBtnContainer}>
					{!platform.webos ? <TooltipButton className={css.outputBtn} icon="folder" minWidth={false} onBlur={handleClose} onClick={handleOpen} onFocus={handleFocus} size="small" tooltipText="Show output data">Show output</TooltipButton> : ''}
					{!platform.webos ? <TooltipButton className={css.outputBtn} css={css} icon="files" minWidth={false} onBlur={handleClose} onClick={copyToClipboard} onFocus={handleFocus} size="small" tooltipText="Copy to clipboard">Copy</TooltipButton> : ''}
					{!platform.webos ? <TooltipButton className={css.outputBtn} css={css} icon="download" minWidth={false} onBlur={handleClose} onClick={generateFile} onFocus={handleFocus} size="small" tooltipText="Get CSS file">Download</TooltipButton> : ''}
					<TooltipButton open className={css.outputBtn} css={css} icon="refresh" minWidth={false} onBlur={handleClose} onClick={setDefaultState} onFocus={handleFocus} size="small" tooltipText="Restore skin to default colors">Reset</TooltipButton> {/* eslint-disable-line */}
				</div>
			</Cell>
		);
	}});

export default Toggleable({prop: 'popupOpen', toggle: 'onToggleOpen'}, OutputField);
