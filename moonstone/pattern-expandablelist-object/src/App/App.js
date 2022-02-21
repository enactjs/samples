import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels} from '@enact/moonstone/Panels';

import MainPanel from '../views/MainPanel';

const AppBase = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<Panels>
				<MainPanel title="Expandable List" />
			</Panels>
		</div>
	)
});

const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
