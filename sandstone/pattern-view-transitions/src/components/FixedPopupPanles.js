import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import FixedPopupPanels, {Header, Panel} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';

import {addViewTransition} from './utils/utils';
import css from './FixedPopupPanels.module.less';

const FixedPopupPanelsWithTransition = ({props}) => {
	const [isOpen, setIsOpen] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const element = useRef(null);

	const handleOnClickFixed = useCallback(() => {
		setIsOpen(prevState => !prevState);
	}, []);

	const handleDisable = useCallback(() => {
		setDisabled(prevState => !prevState);
	}, []);

	const onAppear = useCallback(async () => {
		element.current = document.getElementById('fixedPopupPanels');
		await addViewTransition(0, 'Dissolve-fixed', element.current);
	}, []);

	const onClose = useCallback(async () => {
		await addViewTransition(1, 'Dissolve-fixed', element.current, () => setIsOpen(prevState => !prevState));
	}, []);

	return (
		<div>
			<Button onClick={handleOnClickFixed}>Open fixed</Button>
			<BodyText>Default component animation: {disabled ? 'disabled' : 'enabled'}</BodyText>
			<Button onClick={handleDisable}>Disable default animation</Button>
			<FixedPopupPanels
				className={css.fixedPopupPanels}
				id="fixedPopupPanels"
				noAnimation={disabled}
				noAutoDismiss
				onAppear={onAppear}
				onClose={onClose}
				open={isOpen}
				{...props}
			>
				<Panel>
					<Header>
						<title>FixedPopupPanels Title</title>
						<subtitle>A panel type for options views</subtitle>
					</Header>
					<BodyText>Example text inside an FixedPopupPanels Panel</BodyText>
					<Item>Example Item 1</Item>
					<Item>Example Item 2</Item>
					<Item>Example Item 3</Item>
				</Panel>
			</FixedPopupPanels>
		</div>
	);
};

export default FixedPopupPanelsWithTransition;

FixedPopupPanelsWithTransition.propTypes = {
	props: PropTypes.object,
	selectedTransition: PropTypes.bool
};
