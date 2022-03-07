/* eslint-disable react-hooks/rules-of-hooks, react/jsx-no-bind */

import kind from '@enact/core/kind';
import {Column} from '@enact/ui/Layout';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {useEffect, useState} from 'react';
import {flushSync} from 'react-dom';

const NotBatchedAssign = kind({
	name: 'NotBatchedAssign',

	functional: true,

	render: () => {
		const [renders, setRenders] = useState(-1);
		const [value, setValue] = useState(0);

		useEffect(() => {
			setRenders(r => r + 1);
		}, [value]);

		const assignFunctionNotBatched = () => {
			if (value === 0) {
				for (let i = 0; i < 1000; ++i) {
					flushSync(() => {
						setValue(i + 1);
					});
				}
			} else {
				for (let i = 1000; i >= 0; --i) {
					flushSync(() => {
						setValue(i);
					});
				}
			}
		};

		return (
			<div>
				<Column>
					<BodyText>If you click `Not Batched update!` the value will go from {value} to {value === 0 ? 1000 : 0}!</BodyText>
					<BodyText>The current value is {value}!</BodyText>
					<BodyText>There have been {renders} re-renders!</BodyText>
					<Button onClick={() => assignFunctionNotBatched(value)}>Not Batched update!</Button>
					<Button onClick={() => setRenders(0)}>Clear re-renders!</Button>
				</Column>
			</div>
		);
	}
});

export default NotBatchedAssign;

