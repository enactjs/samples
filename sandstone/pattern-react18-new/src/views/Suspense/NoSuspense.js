import {useEffect, useState} from 'react';

import SamplePage from './SamplePage';

const NoSuspense = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 3000);
	}, []);

	return (
		<div>
			{
				loading ? null :
				<div>
					<SamplePage/>
				</div>
			}
		</div>
	);
};

export default NoSuspense;
