import kind from '@enact/core/kind';
import Spinner from '@enact/sandstone/Spinner';
import {Suspense} from 'react';

import Gallery3D from '../components/Gallery3D';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => {
		return (
			<Suspense fallback={<Spinner />}>
				<Gallery3D />
			</Suspense>
		);
	}
});

export default MainPanel;
