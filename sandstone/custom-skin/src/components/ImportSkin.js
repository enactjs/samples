import kind from "@enact/core/kind";
import {InputFieldDecorator} from "@enact/sandstone/Input";

const ImportSkin = kind({

	handlers:{
		showFile: async (ev) => {
			ev.preventDefault()
			const reader = new window.FileReader()
			reader.onload = async (event) => {
				let text = (event.target.result).split("\n\t");
				text.shift();
				text.pop();
				text = text.filter(string => string[0] !== '/' && !string.includes('Skin Name'));
				console.log(text);
			};
			reader.readAsText(ev.target.files[0]);
		}
	},

	render:({showFile}) => {
		return <input type="file" onChange={showFile} />
	}
})

export default InputFieldDecorator(ImportSkin);
