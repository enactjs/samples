
export const save = (saved) => ({
	type: 'SAVE_PROFILE_PHOTO',
	saved
});

export const setPreview = (previewPhoto) => ({
	type: 'SET_PREVIEW_PHOTO',
	previewPhoto
});
