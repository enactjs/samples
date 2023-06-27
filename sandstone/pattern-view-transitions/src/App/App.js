import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const AppBase = () => {
	// Apply view transitions at every render
	if (!document.startViewTransition) {
		// handle unsupported browsers
		return;
	} else {
		document.startViewTransition();
	}

	// Apply view transitions when changing resolution (also valid for switching between portrait and landscape)
	window.onresize = function () {
		if (!document.startViewTransition) {
			// handle unsupported browsers
			return;
		}

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
