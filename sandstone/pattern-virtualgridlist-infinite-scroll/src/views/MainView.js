import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

import InfiniteScrollList from '../components/InfiniteScrollList';

const MainView = kind({
	name: 'App',

	render: (props) => (
		<Panel {...props}>
			<Header title="VirtualGridList With Infinite Scroll" />
			<InfiniteScrollList />
		</Panel>
	)
});

export default MainView;

