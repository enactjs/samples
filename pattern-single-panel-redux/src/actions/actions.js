export const save = (saved) => ({
	type: 'SAVE_PROFILE_PHOTO',
	saved
});

export const setPreview = (previewPhoto) => ({
	type: 'SET_PREVIEW_PHOTO',
	previewPhoto
});

export const changePhotoPosition = (photoPosition) => ({
	type: 'CHANGE_PHOTO_POSITION',
	photoPosition
});
