import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import componentCss from './ImportSkin.module.less';

const ImportSkin = kind({
	name: 'ImportSkin',

	propTypes: {
		setColors: PropTypes.func
	},

	handlers:{
		showFile: async (ev, {setColors}) => {
			ev.preventDefault();
			const reader = new window.FileReader();
			reader.onload = async (event) => {
				let text = (event.target.result).split('\n\t');
				text.shift();
				text.pop();
				text = text.filter(string => {
					if (string[0] !== '/' || string.includes('/* Skin Name')) {
						return string;
					}
				});
				setColors(text);
			};
			try {
				reader.readAsText(ev.target.files[0]);
			} catch (err) {
				// eslint-disable-next-line
				console.log(err);
			}
		}
	},

	render:({showFile}) => {
		return (
			<div className={componentCss.inputFile}>
				<label htmlFor="inputStyle">Import your stylesheet</label>
				<input name="inputStyle" onChange={showFile} type="file" />
			</div>
		);
	}
});

export default ImportSkin;
