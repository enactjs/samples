import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const AppBase = () => {
	// Apply view transitions on page load
	window.onload = function () {
		document.startViewTransition();
	};

	// Apply view transitions when changing resolution (also valid for switching between portrait and landscape)
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
