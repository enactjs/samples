import {convertToRGB, getComponentLayoutParent, getComponentPadding} from "./helpers";
import {CustomComponent, CustomComponentProperties, CustomComponentStyles, EnactComponentNode} from "../types";

/**
 * Extracts child components' properties from a Figma component.
 *
 * @param {CustomComponent} component - The Figma component from which child components are extracted.
 * @returns {Array<string>} An array of child components.
 */
const extractChildComponents = (component: CustomComponent): Array<string> => {
	let childrenNode = [];

	component.componentProps.parent.children.forEach((children) => {
		if (children.type === 'TEXT') {
			childrenNode.push(children.characters);
		}
	});

	return childrenNode;
};

/**
 * Extracts component properties from a Figma component, including parent and exposed instances.
 *
 * @param {CustomComponent} component - The Figma component from which properties are extracted.
 * @returns {CustomComponentProperties} A record of key-value pairs representing the component's properties.
 */
const extractComponentProps = (component: CustomComponent): CustomComponentProperties => {
	const parentComponent = (component.componentProps.parent as InstanceNode);
	const {componentProperties} = parentComponent;

	const result: Record<string, any> = {};

	const getPropsValues = (props: object) => {
		for (const key in props) {
			if (props.hasOwnProperty(key)) {
				result[key] = props[key].value;
			}
		}
	};

	getPropsValues(componentProperties);

	parentComponent.exposedInstances?.filter(instance => instance.visible).forEach(instance => {
		getPropsValues(instance.componentProperties);
	});

	return result;
};

/**
 * Extracts styles (e.g., dimensions, colors, padding) from a Figma component.
 *
 * @param {CustomComponent} customComponent - The Figma component from which styles are extracted.
 * @returns {CustomComponentStyles} An object containing styles such as `backgroundColor`, `borderRadius`, `fontSize`, `height`, `width`, etc.
 */
const extractComponentStyles = (customComponent: CustomComponent): CustomComponentStyles => {
	const isLayoutComponent = getComponentLayoutParent(customComponent.componentName)
	const component = isLayoutComponent ? customComponent.componentProps : (customComponent.componentProps.parent as InstanceNode);
	const {children, cornerRadius, fills, height: componentHeight, opacity: componentOpacity, parent, width: componentWidth, x, y} = component;

	const scaleToRem = (value: number) => (value !== undefined && value !== null) && `ri.scaleToRem(${value})`;

	const componentFontSize = (children?.find(value => (value as TextNode).fontSize) as TextNode)?.fontSize;
	return {
		backgroundColor: fills[0]?.visible && convertToRGB(fills[0].color),
		borderRadius: String(cornerRadius),
		color: convertToRGB(children?.find(value => value.type === 'TEXT')?.fills[0]?.color),
		fontSize: !isLayoutComponent && scaleToRem(Number(componentFontSize)),
		height: scaleToRem(componentHeight),
		left: scaleToRem(x >= 0 ? x : (parent as InstanceNode).x),
		opacity: String(componentOpacity),
		padding: getComponentPadding(component),
		top: scaleToRem(y >= 0 ? y : (parent as InstanceNode).y),
		width: scaleToRem(componentWidth)
	}
};

/**
 * Creates an Enact component node from a Figma component.
 *
 * @param {CustomComponent} component - The Figma component to be converted into an Enact component node.
 * @param {string} [parent=''] - The parent component's name or identifier.
 * @returns {string} The generated Enact component node as a string.
 */
const createComponentNode = (component: CustomComponent, parent: string = ''): string => {
	const childComponents = extractChildComponents(component);
	const componentLayoutParent = getComponentLayoutParent(parent);
	const componentProps = extractComponentProps(component);
	const componentStyles = extractComponentStyles(component);

	const componentNode = new EnactComponentNode(component.componentName, componentLayoutParent);
	componentNode
		.createComponent(childComponents)
		.addComponentStyle(componentStyles)
		.addComponentProps(componentProps);

	const generatedNode = componentNode.generatedComponentNode;
	return generatedNode ?? '';
};

export default createComponentNode;
