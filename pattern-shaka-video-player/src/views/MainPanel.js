import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import ShakaVideoPlayer from '../components/ShakaVideoPlayer';

const sintelManifestUri = 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="VideoPlayer" titleBelow="powered by Shaka Player" />
			<ShakaVideoPlayer autoPlay manifestUri={sintelManifestUri} />
		</Panel>
	)
});

export default MainPanel;
