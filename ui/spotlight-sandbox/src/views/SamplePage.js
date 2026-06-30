import Heading from '@enact/ui/Heading';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {useNavigate} from 'react-router';

import SpottableButton from '../components/SpottableButton';

import css from './SamplePage.module.less';

const SamplePage = ({children, title}) => {
	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<div className={css.page}>
			<SpottableButton className={css.backButton} onClick={handleBack}>
				Back to Samples
			</SpottableButton>
			<Heading size="title">{title}</Heading>
			{children}
		</div>
	);
};

SamplePage.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string
};

export default SamplePage;
