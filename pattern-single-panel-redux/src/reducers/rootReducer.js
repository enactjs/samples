import {combineReducers} from 'redux';
import mural from '../../assets/images/mural.jpeg';

const initialState = {
	photoIndex: 0,
	url: mural
};
const initialPosition = -50;

const saved = (state = false, action) => {
	switch (action.type) {
		case 'SAVE_PROFILE_PHOTO':
			return action.saved;
		default:
			return state;
	}
};

const photo = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PREVIEW_PHOTO':
			return {
				url: action.previewPhoto.url,
				photoIndex: action.previewPhoto.photoIndex
			};
		default:
			return state;
	}
};

const photoPosition = (state = initialPosition, action) => {
	switch (action.type) {
		case 'CHANGE_PHOTO_POSITION':
			return action.photoPosition;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	saved,
	photo,
	photoPosition
});

export default rootReducer;
