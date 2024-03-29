import BodyText from '@enact/sandstone/BodyText';
import Spinner from '@enact/sandstone/Spinner';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import {fetchData} from './FakeApi';

const CONTENT = {
	One: 'This is the content of the first page',
	Two: 'This is the content of the second page',
	Three: 'This is the content of the third page'
};

function Content ({page}) {
	const [isLoading, setIsLoading] = useState(true);
	const [time, setTime] = useState();

	useEffect(() => {
		fetchData().then((data) => {
			setTime(data);
			setIsLoading(false);
		});
	}, []);

	return isLoading ? (
		<Spinner transparent />
	) : (
		<BodyText>
			Loading of content took {time.toFixed()}ms.
			<br />
			{CONTENT[page]}
		</BodyText>
	);
}

Content.propTypes = {
	page: PropTypes.string
};

function ContentUseTransition ({page, resource}) {
	const time = resource.delay.read();
	return (
		time && (
			<div className="tab-content">
				<div>
					Loading of content took {time.toFixed()}ms.
					<br />
					{CONTENT[page]}
				</div>
			</div>
		)
	);
}

export default Content;
export {Content, ContentUseTransition};
