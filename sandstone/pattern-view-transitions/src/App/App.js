import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const AppBase = () => {
	window.onload = function () {
		document.startViewTransition();
	};

	window.onresize = function () {
		document.startViewTransition();
	};

	return (
		<div className={css.app}>
			<MainPanel />
		</div>
	);
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
