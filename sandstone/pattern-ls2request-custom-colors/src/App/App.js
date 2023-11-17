import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useState} from 'react';

import MainView from '../views/MainView';
import screenTypes from '../../screenTypes.json';

import {AppContext, customColorsContext} from '../constants';

const App = (props) => {
	const [context, setContext] = useState(customColorsContext);

	return (
		<AppContext.Provider value={{context, setContext}}>
			<MainView {...props} />
		</AppContext.Provider>
	);
};

export default ThemeDecorator({ri: {screenTypes}}, App);