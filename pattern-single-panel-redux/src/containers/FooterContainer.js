import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import {save} from '../actions';
import SaveButton from '../components/SaveButton';
import SavedPopup from '../components/SavedPopup';

import css from './containerStyles.less';

const Footer = kind({
	name: 'Footer',

	propTypes: {
		saved: PropTypes.bool,
		saveToState: PropTypes.func
	},

	styles: {
		css,
		className: 'saveButton'
	},

	render: ({saved, saveToState, ...rest}) => {
		return (
			<div {...rest}>
				<SaveButton saved={saved} saveToState={saveToState} />
				<SavedPopup saved={saved} saveToState={saveToState} />
			</div>
		);
	}
});

const mapStateToProps = (state) => {
	return ({
		saved: state.saved
	});
};

const mapDispatchToProps = (dispatch) => ({
	saveToState: (saved) => {
		// Dipatch the change to state.saved
		dispatch(save(saved));

		// Add other things you want to do when the state.saved is changed
	}
});

const FooterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);

export default FooterContainer;
