import Button from "@enact/sandstone/Button";
import ImageItem from "@enact/sandstone/ImageItem";
import Panels, {Header, Panel} from "@enact/sandstone/Panels";
import PropTypes from 'prop-types';
import {useCallback, useEffect, useMemo, useState} from 'react';

import {addViewTransition} from "./utils/utils";

import './utils/Animations.module.less';

const PanelsViewTransition = ({selectedTransition, props}) => {
	const [index, setIndex] = useState(0);
	const [element, setElement] = useState(null);

	const randomText = useMemo(() => {
		return 	[
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			'Aliquid animi aut autem culpa dignissimos distinctio.',
			'Eum explicabo facere facilis impedit iure labore necessitatibus.',
			'Obcaecati odio praesentium quae quidem suscipit voluptates.',
			'Dolorum natus placeat quaerat qui quisquam.'
		];
	}, []);
	const h = window.innerHeight;
	const w = window.innerWidth;

	useEffect(() => {
		setElement(document.getElementById('panels'));
	}, []);

	const handleBack = useCallback(async () => {
		await addViewTransition(0, selectedTransition, element, () => setIndex((prevState) => prevState - 1));
	}, [element, selectedTransition]);

	const handleForward = useCallback(async () =>  {
		await addViewTransition(1, selectedTransition, element, () => setIndex((prevState) => prevState + 1));
	}, [element, selectedTransition]);

	const generatePanels = useCallback((noOfPanels) => {
		const panels = [];
		for (let i = 0; i < noOfPanels; i++) {
			panels.push(
				<Panel key={i}>
					<Header
						centered
						noCloseButton
						noSubtitle
						title={`Panel with Kitten ${i + 1}`}
						type="mini"
					>
						<p>{randomText[i]}</p>
						{
							i < (noOfPanels - 1) &&
							<Button
								icon="arrowlargeright"
								iconFlip="auto"
								onClick={handleForward}
								size="small"
								slot="slotAfter"
							/>
						}
					</Header>
					<ImageItem
						centered
						label={`kitten ${i}`}
						src={`//loremflickr.com/${w}/${h}/kitten?random=${index}`}
					/>
				</Panel>
			);
		}

		return panels;
	}, [h, handleForward, index, randomText, w]);

	return (
		<Panels {...props} id="panels" index={index} noAnimation onBack={handleBack}>
			{generatePanels(5)}
		</Panels>
	);
};

export default PanelsViewTransition;

PanelsViewTransition.propTypes = {
	props: PropTypes.object,
	selectedTransition: PropTypes.bool
};
