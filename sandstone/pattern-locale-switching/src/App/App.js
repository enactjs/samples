import kind from '@enact/core/kind';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {connect} from 'react-redux';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const _AppBase = kind({
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

const mapStateToProps = ({locale}) => ({locale});

const AppBase = connect(mapStateToProps, {})(_AppBase);
const App = connect(mapStateToProps, {})(ThemeDecorator(_AppBase));

export default App;
export {App, AppBase};
