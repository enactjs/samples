import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {Route} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Routable, {Linkable} from '@enact/ui/Routable';
import {useState} from 'react';

import Batching from '../views/Batching';
import Suspense from '../views/Suspense';
import UseTransition from '../views/UseTransition';

import css from './App.module.less';

const LinkedButton = Linkable(Button);

const RoutableViews = Routable({navigate: 'onNavigate'}, ({children}) => (
	<>{children}</>
));

const HomeView = () => (
	<div className={css.app}>
		<Heading>React 18 Features</Heading>
		<LinkedButton path="./batching">
			Batching
		</LinkedButton>
		<LinkedButton path="./suspense">
			Suspense
		</LinkedButton>
		<LinkedButton path="./useTransition">
			useTransition
		</LinkedButton>
	</div>
);

const App = (props) => {
	let [path, setPath] = useState('/app');

	const handleNavigate = (ev) => {
		setPath(ev.path);
	};

	return (
		<div {...props}>
			{/* eslint-disable-next-line react/jsx-no-bind */}
			<RoutableViews onNavigate={handleNavigate} path={path}>
				<Route path="app" component={HomeView}>
					<Route path="batching" component={Batching} />
					<Route path="suspense" component={Suspense} />
					<Route path="useTransition" component={UseTransition} />
				</Route>
			</RoutableViews>
		</div>
	);
};

export default ThemeDecorator(App);
