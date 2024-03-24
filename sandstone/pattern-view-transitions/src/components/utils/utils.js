const transitionName = {
	'No transition': ['', ''],
	'Dissolve': ['dissolve', 'dissolve'],
	'Dissolve-fixed': ['dissolve-out', 'dissolve-in'],
	'Rotate': ['rotate-left', 'rotate-right'],
	'Swipe': ['swipe-left', 'swipe-right'],
	'Swipe Up': ['swipe-up', 'swipe-up'],
	'Zoom In': ['zoom-in', 'zoom-in'],
	'Zoom Swipe': ['zoom-swipe-left', 'zoom-swipe-right']
};

export const addViewTransition = async (animationIndex, selectedAnimation, element, stateChange) => {
	if (!document.startViewTransition || selectedAnimation === '' || !transitionName[selectedAnimation][animationIndex]) {
		if (stateChange) stateChange();
		return;
	}

	document.startViewTransition(() => {
		element.style.viewTransitionName = transitionName[selectedAnimation][animationIndex];
		if (stateChange) stateChange();
	});
};
