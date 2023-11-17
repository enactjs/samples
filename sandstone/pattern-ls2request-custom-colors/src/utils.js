// This functions checks if the OS this app is running on is WebOS
// If we try to use WebOS specific functionalities in other operating systems we will get a console error
export const isSystemWebOS = () => {
	return !!(typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams);
};

export const hexToRGB = (hex) => {
	// Converts a HEX color into an RGB one
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
};
