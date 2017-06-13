import Button from '@enact/moonstone/Button';

import React from 'react';
import {Link} from 'react-router-dom';
import css from './ButtonToSamples.less'

const ButtonToSamples = () => (
	<div className={css.buttonContainer}>
		<Link to="/" className={css.backLink}>
			<Button
				className={css.backButton}
				style={{zIndex: 1}}
			>
				Back To Samples
			</Button>
		</Link>
	</div>
)

export default ButtonToSamples;