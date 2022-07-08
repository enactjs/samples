import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/agate/Button';
import Input from '@enact/agate/Input';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {updateLocale as updateLocaleActions} from '../../store';

const LocaleSwitchBase = ({rtl, updateLocale}) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	const handleChange = useCallback((ev) => setValue(ev.value), []);
	const updateContext = useCallback(() => updateLocale(value), [updateLocale, value]);
	const updateRedux = useCallback(() => dispatch(updateLocaleActions(value)), [dispatch, value]);

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
	updateLocale: PropTypes.func
};

const LocaleSwitch = I18nContextDecorator(
	{updateLocaleProp: 'updateLocale', 'rtlProp': 'rtl'},
	LocaleSwitchBase
);

export default LocaleSwitch;
