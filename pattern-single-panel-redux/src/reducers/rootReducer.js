import {combineReducers} from 'redux';
import mural from '../../assets/images/mural.jpeg';

const defaultProfilePhoto = {
	photoIndex: 0,
	position: -50,
	url: mural
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
				position: action.previewPhoto.position || state.position,
				photoIndex: action.previewPhoto.photoIndex || state.photoIndex
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	saved,
	photo
});

export default rootReducer;
