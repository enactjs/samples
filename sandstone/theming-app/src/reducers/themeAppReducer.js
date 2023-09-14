const themeAppReducer = (state, action) => {
	switch (action.type) {
		case 'dynamicSkin':
			return state.dynamicColor = action.value ? 'on' : 'off';
		case 'handleSkin':
			return state.handleSkin = action.value ? 'on' : 'off';
		case 'theme':
			return state.backgroundColor = action.value;
		default:
			throw Error('Unknown action!');
	}
}

export default themeAppReducer;
