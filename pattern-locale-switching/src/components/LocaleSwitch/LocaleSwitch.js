import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from '@enact/moonstone/Input';
import Button from '@enact/moonstone/Button';
import {contextTypes} from '@enact/i18n/I18nDecorator';
import {connect} from 'react-redux';
import {updateLocale} from '../../actions';

class LocaleSwitch extends Component {
	static propTypes = {
		updateReduxLocale: PropTypes.func
	}

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
	}

	updateContextLocale = () => {
		this.context.updateLocale(this.state.value);
	}

	updateReduxLocale = () => {
		this.props.updateReduxLocale(this.state.value);
	}

	render () {
		return (
			<div>
				<p>This locale {this.context.rtl ? 'is' : 'isn\'t'} RTL</p>
				<Input value={this.state.value} onChange={this.handleChange} placeholder="Try 'ar-SA'" />
				<Button onClick={this.updateContextLocale}>Update Context</Button>
				<Button onClick={this.updateReduxLocale}>Update Redux</Button>
			</div>
		);
	}
}

LocaleSwitch.contextTypes = contextTypes;

export default connect(null, {updateReduxLocale: updateLocale}, null, {pure: false})(LocaleSwitch);
