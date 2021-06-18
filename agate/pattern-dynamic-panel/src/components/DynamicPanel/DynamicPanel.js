import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

const DynamicPanelBase = kind({
	name: 'DynamicPanelBase',

	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.string
	},

	render: ({children, path, ...rest}) => {
		delete rest.onNavigate;

		return (
			<Panel {...rest} >
				<Header subtitle="Press [ESC] to return to previous path" title={path} />
				{children}
			</Panel>
		);
	}
});

export default DynamicPanelBase;
export {DynamicPanelBase as DynamicPanel, DynamicPanelBase};
