import React from 'react';
import kind from '@enact/core/kind';
import SaveButton from '../components/SaveButton';
import SavedPopup from '../components/SavedPopup';
import css from './containerStyles.less';
import {connect} from 'react-redux';
import {save} from '../redux-actions';

const Footer = kind({
	name: 'Footer',

	styles: {
		css,
		className: 'saveButton'
	},

	render: ({...rest}) => {
		return (
			<div {...rest}>
				<SaveButton {...rest} />
				<SavedPopup {...rest} />
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
