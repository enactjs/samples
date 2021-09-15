import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {InputField} from '@enact/sandstone/Input';
import BodyText from "@enact/sandstone/BodyText";

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props}>
			<div >
				<div style={{display:"flex", flexDirection:"row", justifyItems:"center"}}>
					<BodyText style={{height:"50px", width:"450px", alignItems:"center"}}>Normal text color</BodyText>
					<InputField max style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Subtitle color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Focused text color (RGB)</BodyText>
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Focused Background color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Selected color (RGB)</BodyText>
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Selected Background Color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Overlay Panel Background Color (RGB)</BodyText>
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<InputField style={{height:"50px", width:"110px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Toggle On Background Color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Toggle Off Color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
				<div style={{display:"flex", flexDirection:"row"}}>
					<BodyText style={{height:"50px", width:"450px"}}>Toggle Off Background Color</BodyText>
					<InputField style={{height:"50px", width:"200px"}} />
					<Button disabled style={{backgroundColor:'red', height:"50px", width:"50px"}} />
				</div>
			</div>
			<p>
				{`.sandstone-theme { \n
				--sand-text-color: ${'#E6E6E6'};                       			/* Normal Text Color */ \n
				--sand-text-sub-color: ${'#848290'};                   			/* Subtitle Text Color */ \n
				--sand-focus-text-color-rgb: ${'77'}, ${'25'}, ${'142'};        /* Focused Text Color (Must be RGB comma separated format) */ \n
				--sand-focus-bg-color: ${'#E6E6E6'};                   			/* Focused Background Color */ \n
				--sand-selected-color-rgb: ${'230'}, ${'230'}, ${'230'};        /* Selected Color (Must be RGB comma separated format) */ \n
				--sand-selected-bg-color: ${'#76618E'};                			/* Selected Background Color */ \n
				--sand-overlay-bg-color-rgb: ${'47'}, ${'31'}, ${'67'};         /* Overlay Panel Background Color (Must be RGB comma separated format, will have alpha value based on this) */ \n
				--sand-toggle-on-bg-color: ${'#8A75A2'};               			/* Toggle On Background Color */ \n
				--sand-toggle-off-color: ${'#80778C'};                 			/* Toggle Off Color */ \n
				--sand-toggle-off-bg-color: ${'#54416C'};              			/* Toggle Off Background Color */ \n
				}`}
			</p>
		</div>
	)
});

export default MainPanel;
