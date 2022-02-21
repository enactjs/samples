import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/agate/Button';
import Input from '@enact/agate/Input';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connect} from 'react-redux';

import {updateLocale} from '../../actions';

class LocaleSwitchBase extends Component {
	static propTypes = {
		rtl: PropTypes.bool,
		updateLocale: PropTypes.func,
		updateReduxLocale: PropTypes.func
	};

	constructor (props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	handleChange = (ev) => {
		this.setState({
			value: ev.value
		});
	};

	updateContextLocale = () => {
		this.props.updateLocale(this.state.value);
	};

	updateReduxLocale = () => {
		this.props.updateReduxLocale(this.state.value);
	};

	render () {
		return (
			<div>
				<p>This locale {this.props.rtl ? 'is' : 'isn\'t'} RTL</p>
				<Input value={this.state.value} onChange={this.handleChange} placeholder="Try 'ar-SA'" />
				<Button onClick={this.updateContextLocale}>Update Context</Button>
				<Button onClick={this.updateReduxLocale}>Update Redux</Button>
			</div>
		);
	}
}

const LocaleSwitch = I18nContextDecorator(
	{updateLocaleProp: 'updateLocale', 'rtlProp': 'rtl'},
	LocaleSwitchBase
);

export default connect(null, {updateReduxLocale: updateLocale}, null, {pure: false})(LocaleSwitch);
