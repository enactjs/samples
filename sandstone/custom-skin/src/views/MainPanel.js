import Scroller from '@enact/sandstone/Scroller';

import OutputField from '../components/OutputField';
import SingleField from '../components/SingleField';
import TripleField from '../components/TripleField';


const MainPanel = () => {
	function onChangeInput (props) {
		// eslint-disable-next-line
		console.log(props);
	}

	return (
		<Scroller>
			<div>
				<SingleField color="red" propName="Background color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Normal Text color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Subtitle color" onChangeInput={onChangeInput} />
				<TripleField red={255} green={255} blue={255} propName="Focused text color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Focused Background color" onChangeInput={onChangeInput} />
				<TripleField red={255} green={255} blue={255} propName="Selected color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Selected Background Color" onChangeInput={onChangeInput} />
				<TripleField red={255} green={255} blue={255} propName="Overlay Panel Background Color (RGB)" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle On Background Color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle Off Color" onChangeInput={onChangeInput} />
				<SingleField color="red" propName="Toggle Off Background Color" onChangeInput={onChangeInput} />
				<OutputField
					colors={['red', 'red', 'red', 255, 255, 255, 'red', 255, 255,
						255, 'red', 255, 255, 255, 'red', 'red', 'red']}
				/>
			</div>
		</Scroller>
	);
};

export default MainPanel;
