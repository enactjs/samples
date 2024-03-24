import QuickGuidePanels, {Panel} from '@enact/sandstone/QuickGuidePanels';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';

import {addViewTransition} from './utils/utils';

const QuickGuidePanelsWithTransition = ({selectedTransition, props}) => {
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
		<QuickGuidePanels {...props} id="panels" onPrevClick={onPrevClick} onNextClick={onNextClick}>
			<Panel>
				This is Panel 1
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi doloribus est eum, id iste
					laboriosam rem. Aperiam at, cum dolores est laboriosam, neque obcaecati pariatur perspiciatis quam
					sapiente sint voluptatum.</p>
			</Panel>
			<Panel>
				This is Panel 2
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi atque dignissimos doloremque,
					eligendi enim illum incidunt laudantium numquam praesentium quas qui recusandae, reiciendis sed sit
					sunt tempora totam unde?</p>
			</Panel>
			<Panel>
				This is Panel 3
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A earum eos eum eveniet excepturi hic illo
					illum minus necessitatibus neque nostrum omnis placeat porro quam repudiandae suscipit ullam, ut!
					Dolores?</p>
			</Panel>
		</QuickGuidePanels>
	);
};

export default QuickGuidePanelsWithTransition;

QuickGuidePanelsWithTransition.propTypes = {
	props: PropTypes.object,
	selectedTransition: PropTypes.bool
};
