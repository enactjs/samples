import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import Batching from '../views/Batching/Batching';
import Suspense from '../views/Suspense/Suspense';
import UseTransition from '../views/UseTransition/UseTransition';

import css from './App.module.less';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';

const App = (props) => {
	return (
		<div className={css.app} {...props}>
			<TabLayout orientation="horizontal" className={css.tabLayout}>
				<Tab className={css.tab} title="Batching">
					<Batching />
				</Tab>
				<Tab className={css.tab} title="Suspense">
					<Suspense />
				</Tab>
				<Tab className={css.tab} title="useTransition">
					<UseTransition />
				</Tab>
			</TabLayout>
		</div>
	);
};

export default ThemeDecorator(App);
