export const save = (saved) => ({
	type: 'SAVE_PROFILE_PHOTO',
	saved
});

export const changePhotoIndex = (photoIndex) => ({
	type: 'CHANGE_PHOTO_INDEX',
	photoIndex
});

export const changePhotoPosition = (photoPosition) => ({
	type: 'CHANGE_PHOTO_POSITION',
	photoPosition
});
