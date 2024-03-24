import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Scroller from '@enact/sandstone/Scroller';
import WizardPanels, {Panel} from '@enact/sandstone/WizardPanels';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import {addViewTransition} from './utils/utils';

const WizardPanelsWithTransition = ({selectedTransition}) => {
	const [element, setElement] = useState(null);

	useEffect(() => {
		setElement(document.getElementById('panels'));
	}, []);

	const onNextClick = useCallback(async () => {
		await addViewTransition(1, selectedTransition, element);
	}, [element, selectedTransition]);

	const onPrevClick = useCallback(async () => {
		await addViewTransition(0, selectedTransition, element);
	}, [element, selectedTransition]);

	return (
		<WizardPanels
			id="panels"
			noAnimation
			onNextClick={onNextClick}
			onPrevClick={onPrevClick}
		>
			<Panel title="Panel 1">
				<Scroller>
					<BodyText>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deleniti dicta explicabo,
						fugit in incidunt magnam molestiae nemo, numquam quae saepe vero. Dolores eius hic illum
						magni rem sit vel.
					</BodyText>
				</Scroller>
				<footer>
					<Button>OK</Button>
					<Button>Cancel</Button>
				</footer>
			</Panel>
			<Panel title="Panel 2">
				<Scroller>
					<BodyText>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deleniti dicta explicabo,
						fugit in incidunt magnam molestiae nemo, numquam quae saepe vero. Dolores eius hic illum
						magni rem sit vel.
					</BodyText>
				</Scroller>
				<footer>
					<Button>OK</Button>
					<Button>Cancel</Button>
				</footer>
			</Panel>
			<Panel title="Panel 3">
				<Scroller>
					<BodyText>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deleniti dicta explicabo,
						fugit in incidunt magnam molestiae nemo, numquam quae saepe vero. Dolores eius hic illum
						magni rem sit vel.
					</BodyText>
				</Scroller>
				<footer>
					Footer Panel 3
				</footer>
			</Panel>
		</WizardPanels>
	);
};

export default WizardPanelsWithTransition;

WizardPanelsWithTransition.propTypes = {
	selectedTransition: PropTypes.bool
};
