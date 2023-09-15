import {useState} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainView from '../views/MainView';
import screenTypes from '../../screenTypes.json';

import {AppContext, dynamicColorsContext} from '../constants';

const App = (props) => {
	const [context, setContext] = useState(dynamicColorsContext);

	return (
		<AppContext.Provider value={{context, setContext}}>
			<MainView {...props} />
		</AppContext.Provider>
	);
};

export default ThemeDecorator({ri: {screenTypes}}, App);
