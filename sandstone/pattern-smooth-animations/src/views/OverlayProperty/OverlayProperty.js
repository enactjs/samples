import {useCallback, useRef} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
import componentCss from './OverlayProperty.module.less';

const OverlayProperty = ({...rest}) => {
	const dialog = useRef(null);

	const handleOpen = useCallback(() => {
		dialog.current.showModal();
	}, []);

	const handleClose = useCallback(() => {
		dialog.current.close();
	}, []);

	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we have the ability to control top-layer behavior during an animation by using the &apos;overlay&apos; property.
			</BodyText>
			<Row >
				<dialog className={componentCss.dialog} ref={dialog}>
					<p>Hello world. Click on the button.</p>
					<form method="dialog">
						<Button onClick={handleClose}>OK</Button>
					</form>
				</dialog>
				<Button onClick={handleOpen}>Open Dialog</Button>
			</Row>
		</Layout>
	);
};

export default OverlayProperty;
