import {combineReducers} from 'redux';

const initialState = {
	photoIndex: 0,
	photoPosition: -50,
	saved: false
};

const photoIndex = (state = initialState.photoIndex, action) => {
	switch (action.type) {
		case 'CHANGE_PHOTO_INDEX':
			return action.photoIndex;
		default:
			return state;
	}
};

const photoPosition = (state = initialState.photoPosition, action) => {
	switch (action.type) {
		case 'CHANGE_PHOTO_POSITION':
			return action.photoPosition;
		default:
			return state;
	}
};

const saved = (state = initialState.saved, action) => {
	switch (action.type) {
		case 'SAVE_PROFILE_PHOTO':
			return action.saved;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	photoIndex,
	photoPosition,
	saved
});

export default rootReducer;
