import {LAYOUT_COMPONENTS} from "../constants";

/**
 * Converts an RGB color object to a CSS `rgb()` string.
 *
 * @param {{r: number, g: number, b: number}} color - The RGB color object with `r`, `g`, and `b` values ranging from 0 to 1.
 * @returns {string} A CSS `rgb()` string (e.g., `rgb(255, 0, 0)`) or an empty string if the color is invalid or the component is a parent layout component.
 */
const convertToRGB = (color: {r: number, g: number, b: number}): string => {
	if (!color) return '';

	const {r = null, g = null, b = null} = color;

	const red = Math.round(r * 255);
	const green = Math.round(g * 255);
	const blue = Math.round(b * 255);

	return `rgb(${red}, ${green}, ${blue})`;
};

/**
 * Checks if a given component parent name is part of the predefined layout-related components.
 *
 * @param {string} componentParent - The name of the component parent to check.
 * @returns {boolean} `true` if the component parent is in the `componentParentNames` list, otherwise `false`.
 */
const getComponentLayoutParent = (componentParent: string): boolean => {
	return Object.values(LAYOUT_COMPONENTS).includes(componentParent);
};

/**
 * Extracts padding values from an `InstanceNode` and formats them as a CSS-like string.
 *
 * @param {InstanceNode} componentProps - The Figma `InstanceNode` containing padding properties.
 * @returns {string} A string representing the padding values in the format `paddingTop: ri.scaleToRem(value), ...`.
 */
const getComponentPadding = (componentProps: InstanceNode): string => {
	const {paddingBottom = 0, paddingLeft = 0, paddingRight = 0, paddingTop = 0} = componentProps;

	return Object.entries({paddingTop, paddingRight, paddingBottom, paddingLeft})
		.filter(([, value]) => value)
		.map(([key, value]) => `${key}: ri.scaleToRem(${value})`)
		.join(", ");
};

export {convertToRGB, getComponentLayoutParent, getComponentPadding};