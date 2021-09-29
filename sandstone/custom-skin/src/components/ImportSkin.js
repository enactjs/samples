import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

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
					// console.log(string);
					// console.log(string.includes('/* Skin Name'));
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
		return <input type="file" onChange={showFile} />;
	}
});

export default ImportSkin;
