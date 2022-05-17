import Heading from '@enact/sandstone/Heading';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import React, {Suspense, useState} from 'react';

import NoSuspense from './NoSuspense';
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
};

let SamplePage = getSamplePage();

const SuspensePage = () => {
	const [index, setIndex] = useState(0);

	const lazyReload = ({index}) => {
		SamplePage = getSamplePage();
		setIndex(index);
	};

	return (
		<TabLayout index={index} onSelect={lazyReload} orientation="horizontal">
			<Tab title="Using Suspense">
				<Heading>
					Suspense offers a fallback UI for better user experience.
				</Heading>
				<Suspense fallback={<SkeletonPage />}>
					<SamplePage />
				</Suspense>
			</Tab>
			<Tab title="NOT Using Suspense">
				<Heading>
					Page is empty until all the data is available. Please wait 3s.
				</Heading>
				<NoSuspense />
			</Tab>
		</TabLayout>
	);
};

export default SuspensePage;
