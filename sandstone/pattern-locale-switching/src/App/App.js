import kind from '@enact/core/kind';
import I18nDecorator from '@enact/i18n/I18nDecorator';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useSelector} from 'react-redux';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const Sample = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		return (
			<div {...props}>
				<Panels>
					<MainPanel />
				</Panels>
			</div>
		);
	}
});

const AppBase = () => {
	const ThemeBase = I18nDecorator(Sample);
	const state = useSelector((store) => store.locale);
	return (
		<ThemeBase locale={state} />
	);
};

const App = () => {
	const Theme = ThemeDecorator(Sample);
	const state = useSelector((store) => store.locale);
	return (
		<Theme locale={state} />
	);
};

export default App;
export {App, AppBase};
