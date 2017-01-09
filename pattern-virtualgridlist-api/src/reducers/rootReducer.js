import {ADD_ITEM, DELETE_ITEM, SELECTION_ENABLE, SELECT_ALL, TOGGLE_ITEM, CHANGE_ALBUM} from '../actions';
import {combineReducers} from 'redux';

const updateState = (album) => {
	let
		records = [],
		title, subTitle, color;

	for (let idx = 0; idx < 500; ++idx) {
		title = (idx % 8 === 0) ? ' with long title' : '';
		subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.push({
			selected: false,
			text: album + ' ' + idx + title,
			subText: subTitle,
			url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx,
			bgColor: '#' + color
		});
	}

	return records;
}

const data = (state = updateState('Family'), action) => {
	switch (action.type) {
		case ADD_ITEM:
			return [action.item, ...state];
		case DELETE_ITEM:
			return state.filter(item => !item.selected);
		case SELECTION_ENABLE:
			return state.map(item => ({...item, selectionEnable: !item.selectionEnable}));
		case SELECT_ALL:
			return state.map(item => ({...item, selected: !item.selected}));
		case TOGGLE_ITEM:
			return state.map((item, index) => (index !== action.index) ? item : {...item, selected: !item.selected});
		case CHANGE_ALBUM:
			return updateState(action.album);
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	data
})

export default rootReducer;
