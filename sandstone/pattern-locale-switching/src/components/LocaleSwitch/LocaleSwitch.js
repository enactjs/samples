/* eslint-disable react/jsx-no-bind */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {connect} from 'react-redux';

import {updateLocale} from '../../actions';

const LocaleSwitchBase = (props) => {
	const [value, setValue] = useState('');

	const handleChange = (ev) => setValue(ev.value);
	const updateContextLocale = () => props.updateLocale(value);
	const updateReduxLocale = () => props.updateReduxLocale(value);
	return (
		<div>
			<p>This locale {props.rtl ? 'is' : 'isn\'t'} RTL</p>
			<Input value={value} onChange={handleChange} placeholder="Try 'ar-SA'" />
			<Button onClick={updateContextLocale}>Update Context</Button>
			<Button onClick={updateReduxLocale}>Update Redux</Button>
		</div>
	);
};

LocaleSwitchBase.propTypes = {
	rtl: PropTypes.bool,
	updateLocale: PropTypes.func,
	updateReduxLocale: PropTypes.func
};

const LocaleSwitch = I18nContextDecorator(
	{updateLocaleProp: 'updateLocale', 'rtlProp': 'rtl'},
	LocaleSwitchBase
);

export default connect(null, {updateReduxLocale: updateLocale}, null, {pure: false})(LocaleSwitch);
