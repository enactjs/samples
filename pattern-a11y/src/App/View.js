import {Header, Panel} from '@enact/moonstone/Panels';

export default (React) => ({title, view: View, className}) => (
	<Panel className={className}>
		<Header title={title} type='compact' />
		<View />
	</Panel>
);
