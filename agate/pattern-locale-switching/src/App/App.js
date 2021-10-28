import {Panels} from '@enact/agate/Panels';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import kind from '@enact/core/kind';
import {connect} from 'react-redux';

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

const mapStateToProps = ({locale}) => ({locale});

const AppBase = connect(mapStateToProps, {})(Sample);
const App = connect(mapStateToProps, {})(ThemeDecorator(Sample));

export default App;
export {App, AppBase};
