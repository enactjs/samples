import kind from '@enact/core/kind';
import Heading from '@enact/ui/Heading';

import NavContainer from '../containers/NavContainer';

import Body from './Body';

const MainView = kind({
	name: 'MainView',

	render: (props) => (
		<div {...props} style={{position: 'absolute', inset: '0px 18px 24px', overflow: 'hidden'}}>
			<Heading spacing="small" size="title">
				<div
					style={{
						display: 'flex',
						borderBottom: '3px solid grey',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					City Viewer Redux
					<div>
						<NavContainer />
					</div>
				</div>
			</Heading>
			<Body />
		</div>
	)
});

export default MainView;
