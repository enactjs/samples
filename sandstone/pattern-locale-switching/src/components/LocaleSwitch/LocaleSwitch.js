import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';
import {connect} from 'react-redux';

import {updateLocale as updateLocaleActions} from '../../actions';

const LocaleSwitchBase = ({rtl, updateLocale, updateReduxLocale}) => {
	const [value, setValue] = useState('');

	const handleChange = useCallback((ev) => setValue(ev.value), []);
	const updateContext = useCallback(() => updateLocale(value), [updateLocale, value]);
	const updateRedux = useCallback(() => updateReduxLocale(value), [updateReduxLocale, value]);

	return (
		<div>
			<p>This locale {rtl ? 'is' : 'isn\'t'} RTL</p>
			<Input value={value} onChange={handleChange} placeholder="Try 'ar-SA'" />
			<Button onClick={updateContext}>Update Context</Button>
			<Button onClick={updateRedux}>Update Redux</Button>
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

export default connect(null, {updateReduxLocale: updateLocaleActions}, null, {pure: false})(LocaleSwitch);
