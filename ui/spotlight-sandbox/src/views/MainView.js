import BodyText from '@enact/ui/BodyText';
import Heading from '@enact/ui/Heading';
import {useNavigate} from 'react-router';

import SampleItem from '../components/SampleItem';
import {sampleRoutes} from '../routes';

import css from './MainView.module.less';

const MainView = () => {
	const navigate = useNavigate();

	return (
		<div className={css.main}>
			<Heading size="title">Spotlight Sandbox</Heading>
			<BodyText className={css.intro}>
				Select a sample to explore standalone @enact/spotlight behavior. Each sample
				runs on its own page so 5-way navigation stays predictable.
			</BodyText>
			<div className={css.list}>
				{sampleRoutes.map(({path, title}) => (
					<SampleItem key={path} navigate={navigate} path={path}>
						{title}
					</SampleItem>
				))}
			</div>
		</div>
	);
};

export default MainView;
