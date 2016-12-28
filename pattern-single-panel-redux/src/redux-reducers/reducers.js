import {combineReducers} from 'redux';

const defaultProfilePhoto = {
	index: 0,
	size: 100,
	url: '../images/mural.jpeg'
};

const saved = (state = false, action) => {
	switch (action.type) {
		case 'SAVE_PROFILE_PHOTO':
			return action.saved;
		default:
			return state;
	}
};

const photo = (state = defaultProfilePhoto, action) => {
	switch (action.type) {
		case 'SET_PREVIEW_PHOTO':
			return {
				url: action.previewPhoto.url || state.url,
				size: action.previewPhoto.size || state.size,
				index: action.previewPhoto.index || state.index
			};
		default:
			return state;
	}
};

const reducer = combineReducers({
	saved,
	photo
});

export default reducer;
