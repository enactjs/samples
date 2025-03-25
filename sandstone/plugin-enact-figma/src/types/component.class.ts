/**
 * Represents a custom component extracted from a Figma design.
 * This class encapsulates the properties and structure of a Figma component.
 */
class CustomComponent {
	/**
	 * An optional array of child components.
	 */
	children?: CustomComponent[];
	/**
	 * The name of the component.
	 */
	componentName: string;
	/**
	 * The Figma `InstanceNode` containing the component's properties.
	 */
	componentProps: InstanceNode;
	/**
	 * An array of child nodes, which can be either `ComponentNode` or `TextNode`.
	 */
	childrenProps: [ComponentNode] | [TextNode];
	/**
	 * An optional parent component's name or identifier.
	 */
	parent?: string;
	/**
	 * The x-coordinate of the component's position.
	 */
	x: number;
	/**
	 * The y-coordinate of the component's position.
	 */
	y: number;
}

export default CustomComponent;
