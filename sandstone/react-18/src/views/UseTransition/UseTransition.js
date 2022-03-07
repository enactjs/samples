/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-bind,  react/no-unescaped-entities */

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Scroller from '@enact/sandstone/Scroller';
import Spinner from '@enact/sandstone/Spinner';
import Group from '@enact/ui/Group';
import {Suspense, useState, useTransition} from 'react';

import Content, {ContentUseTransition} from './Content';
import {fetchDataUseTransition} from './FakeApi';

import css from './UseTransition.module.less';

const initialResource = fetchDataUseTransition();

const UseTransition = () => {
	const [tab, setTab] = useState(0);
	const [tabUseTransition, setTabUseTransition] = useState(0);
	const [resource, setResource] = useState(initialResource);
	const [isPending, startTransition] = useTransition();

	function handleClick (event) {
		setTab(event.selected);
	}

	function handleClickUseTransition (event) {
		startTransition(() => {
			setTabUseTransition(event.selected);
			setResource(fetchDataUseTransition());
		});
	}

	return (
		<Scroller>
			<div>
				<BodyText className={css.guideText} size="small">
					Until React 17, when needing to fetch data before showing some UI that depends on that data, a loading state would have been rendered in its place, for example a spinner, until the request resolved.
				</BodyText>
				<div className={css.demoContainer}>
					<Group
						childComponent={Button}
						defaultSelected={0}
						itemProps={{size: 'small'}}
						onSelect={(event) => handleClick(event)}
						select={'radio'}
						selectedProp="selected"
					>
						{['One', 'Two', 'Three']}
					</Group>
					<div>
						{tab === 0 && <Content page="One" />}
						{tab === 1 && <Content page="Two" />}
						{tab === 2 && <Content page="Three" />}
					</div>
				</div>
				<BodyText className={css.guideText} size="small">
					Every time the data is changed, the 'Content' component for that tab fetches some data. While that data is being fetched, a 'Spinner' is loaded in the content's place.
				</BodyText>
				<BodyText className={css.guideText} size="small">
					With React18's 'useTransition' hook, the previous state of the UI can be held until the data is ready in a straight-forward way.
				</BodyText>
				<div className={css.demoContainer}>
					<Group
						childComponent={Button}
						defaultSelected={0}
						itemProps={{size: 'small'}}
						onSelect={(event) => handleClickUseTransition(event)}
						select={'radio'}
						selectedProp="selected"
					>
						{['One', 'Two', 'Three']}
					</Group>
					<div>
						<div className={css.useTransitionContent}>
							<Suspense fallback={<div />}>
								{tabUseTransition === 0 && <ContentUseTransition page="One" resource={resource} />}
								{tabUseTransition === 1 && <ContentUseTransition page="Two" resource={resource} />}
								{tabUseTransition === 2 && <ContentUseTransition page="Three" resource={resource} />}
							</Suspense>
						</div>
						<div className={css.pendingBlock}>
							{isPending ?
								<Spinner transparent /> :
								null}
						</div>
					</div>
				</div>
				<BodyText className={css.guideText} size="small">
					Now instead of switching tabs immediately, the current tab continues to show its content until the new tab's content is ready. There is also the possibility to show a loading indicator, by making use of the 'isPending' prop of useTransition
				</BodyText>
			</div>
		</Scroller>
	);
};

export default UseTransition;
