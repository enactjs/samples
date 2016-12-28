import React from 'react';
import SaveButton from '../components/SaveButton';
import SavedPopup from '../components/SavedPopup';
import css from './styles.less';

const Footer = (props) => (
	<div className={css.saveButton}>
		<SaveButton {...props} />
		<SavedPopup {...props} />
	</div>
);

export default Footer;
