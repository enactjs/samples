const colorsReducer = (state, action) => {
	switch (action.type) {
		case 'backgroundColor':
			return state.backgroundColor = action.color;
		case 'componentBackgroundColor':
			return state.backgroundColor = action.color;
		case 'focusBackgroundColor':
			return state.backgroundColor = action.color;
		case 'popupBackgroundColor':
			return state.backgroundColor = action.color;
		case 'subtitleTextColor':
			return state.backgroundColor = action.color;
		case 'titleTextColor':
			return state.backgroundColor = action.color;
		default:
			throw Error('Unknown action!');
	}
}
export default colorsReducer;
