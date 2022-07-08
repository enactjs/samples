/* eslint-disable react/jsx-no-bind */

import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import {useCallback, useState} from 'react';

import ButtonPanel from '../views/ButtonPanel';
import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

const AppBase = (props) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSelectBreadcrumb = useCallback(({index}) => {
		setCurrentIndex(index);
	}, []);

	const handleClick = () => setCurrentIndex(currentIndex + 1);

	return (
		<ActivityPanels {...props} index={currentIndex} onSelectBreadcrumb={handleSelectBreadcrumb}>
			<MainPanel onClick={handleClick} title="First" />
			<ItemPanel onClick={handleClick} title="Second" />
			<ButtonPanel onClick={handleClick} title="Third" />
			<MainPanel title="Fourth" />
		</ActivityPanels>
	);
};

const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
