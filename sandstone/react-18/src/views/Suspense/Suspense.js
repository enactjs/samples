import React, {Suspense, useEffect, useState} from 'react';
import Button from '@enact/sandstone/Button';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';

import SkeletonPage from './SkeletonPage';

// Load the "SamplePage" component after 3s
const getSamplePage = () => {
	return React.lazy(() => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(import('./SamplePage'));
			}, 3000);
		});
	});
}

let SamplePage = getSamplePage();

const SuspensePage = () => {
	const [index, setIndex] = useState(0);

	useEffect( () => {
		// Lazy reload the "SamplePage" component when index changes
		SamplePage = getSamplePage();
	}, [index]);

	const nextPanel = () => setIndex(index + 1); /* eslint-disable react/jsx-no-bind */
	const prevPanel = () => setIndex(index - 1); /* eslint-disable react/jsx-no-bind */

	return (
		<Panels index={index} noCloseButton onBack={prevPanel}>
			<Panel>
				<Header subtitle="Suspense offers a fallback UI for better user experience. Check out next panel." title="Using Suspense" type="mini">
					<slotAfter>
						<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
					</slotAfter>
				</Header>
				<Suspense fallback={<SkeletonPage />}>
					<SamplePage />
				</Suspense>
			</Panel>
			<Panel>
				<Header subtitle="Page is empty until all the data is available. Please wait 3s." title="NOT Using Suspense" type="mini" />
				<SamplePage />
			</Panel>
		</Panels>
	)
};

export default SuspensePage;
