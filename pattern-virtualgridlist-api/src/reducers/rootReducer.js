import {combineReducers} from 'redux';

const item = (state = [], action) => {
	switch (action.type) {
		case types.ADD_ITEM:
			return [action.item, ...state];
		case types.DELETE_ITEM:
			return state.filter(item => !item.selected);
		case types.SELECTION_ENABLE:
			return state.map(item => ({...item, selectionEnable: !item.selectionEnable}));
		case types.SELECT_ALL:
			return state.map(item => ({...item, selected: !item.selected}));
		case types.TOGGLE_ITEM:
			return state.map((item, index) => (index !== action.index) ? item : {...item, selected: !item.selected});
		/*case types.CHANGE_ALBUM:
			return updateState(action.album);*/
		default:
			return state;
	}
}

function album = (state = 'Family', actiion) => {
	
}


const rootReducer = combineReducers({
	index
});

export default rootReducer;

