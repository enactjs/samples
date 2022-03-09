import React, {Suspense, useState} from 'react';
import Button from '@enact/sandstone/Button';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';

import SkeletonPage from './SkeletonPage';
import WithoutSuspense from './WithoutSuspense';

// Load the "SamplePage" component after 3s
const SamplePage = React.lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(import('./SamplePage'));
		}, 3000);
	});
});

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

const SuspensePage = () => {
	const [index, setIndex] = useState(0);

	const nextPanel = () => setIndex(1); /* eslint-disable react/jsx-no-bind */
	const prevPanel = () => setIndex(0); /* eslint-disable react/jsx-no-bind */

	return (
		<Panels index={index} noCloseButton onBack={prevPanel}>
			<Panel>
				<Header subtitle="Suspense offers a fallback UI for better user experience." title="Using Suspense" type="mini">
					<slotAfter>
						<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
					</slotAfter>
				</Header>
				<Suspense fallback={<SkeletonPage />}>
					<SamplePage />
				</Suspense>
			</Panel>
			<Panel>
				<Header subtitle="Page is empty until all the data is available." title="NOT Using Suspense" type="mini" />
				<WithoutSuspense />
			</Panel>
		</Panels>
	)
};

export default SuspensePage;
