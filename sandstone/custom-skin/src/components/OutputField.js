import kind from "@enact/core/kind";
import Button from "@enact/sandstone/Button";
import PropTypes from 'prop-types';

const OutputField = kind({
	name: 'OutputField',

	propTypes:{
		colors: PropTypes.array,
	},

	computed: {
		text: ({colors}) => {
			return `.sandstone-theme {\n` +
			`	--sand-background-color: ${colors[0]};      	  /* Normal Text Color */\n` +
			`	--sand-text-color: ${colors[1]};       	  /* Normal Text Color */\n` +
			`	--sand-text-sub-color: ${colors[2]};           /* Subtitle Text Color */\n` +
			`	--sand-focus-text-color-rgb: ${colors[3]}, ${colors[4]}, ${colors[5]};   /* Focused Text Color (Must be RGB comma separated format) */\n` +
			`	--sand-focus-bg-color: ${colors[6]};           /* Focused Background Color */\n` +
			`	--sand-selected-color-rgb: ${colors[7]}, ${colors[8]}, ${colors[9]}; 	  /* Selected Color (Must be RGB comma separated format) */\n` +
			`	--sand-selected-bg-color: ${colors[10]};        /* Selected Background Color */\n` +
			`	--sand-overlay-bg-color-rgb: ${colors[11]}, ${colors[12]}, ${colors[13]};   /* Overlay Panel Background Color (Must be RGB comma separated */\n` +
			`			  			  /* 	format, will have alpha value based on this) */\n` +
			`	--sand-toggle-on-bg-color: ${colors[14]};       /* Toggle On Background Color */\n` +
			`	--sand-toggle-off-color: ${colors[15]};         /* Toggle Off Color */\n` +
			`	--sand-toggle-off-bg-color: ${colors[16]};      /* Toggle Off Background Color */\n` +
			`}`
		}
	},

	render: ({text}) => {
		function copyToClipboard(){
			/* global navigator */
			return navigator.clipboard.writeText(text);
		}

		return(
			<div>
				<Button onClick={copyToClipboard}>Copy to Clipboard</Button>
				<pre>
					{text}
				</pre>
			</div>
		);
}});

export default OutputField;
