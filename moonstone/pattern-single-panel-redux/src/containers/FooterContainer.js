/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import {useCallback} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {save} from '../store';
import SaveButton from '../components/SaveButton';
import SavedPopup from '../components/SavedPopup';

const FooterCotainer = kind({
	name: 'Footer',

	functional: true,

	render: ({...rest}) => {
		const dispatch = useDispatch();
		const saved = useSelector(state => state.saved);

		const saveToState = useCallback((saved) => dispatch(save(saved)), [dispatch, save]); // eslint-disable-line

		return (
			<div {...rest}>
				<SaveButton saved={saved} saveToState={saveToState} />
				<SavedPopup saved={saved} saveToState={saveToState} />
			</div>
		);
	}
});

export default FooterCotainer;
