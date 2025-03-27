import CustomComponentStyles from "./componentStyles.class";
import CustomComponentProperties from "./componentProperties.class";
import {COMPONENTS, LAYOUT_COMPONENTS} from "../constants";

/**
 * Represents an Enact component node generated from a Figma design.
 * This class encapsulates the logic for creating, styling, and configuring Enact components.
 */
class EnactComponentNode {
	/**
	 * The name of the component.
	 * @private
	 */
	private readonly componentName: string;

	/**
	 * Indicates whether the component has a layout parent.
	 * @private
	 */
	private readonly hasComponentLayoutParent: boolean;

	/**
	 * The generated component node as a string.
	 * @private
	 */
	private componentNode: string;

	/**
	 * Creates an instance of `EnactComponentNode`.
	 *
	 * @param {string} componentName - The name of the component.
	 * @param {boolean} componentLayoutParent - Indicates whether the component has a layout parent.
	 */
	constructor (componentName: string, componentLayoutParent: boolean) {
		this.hasComponentLayoutParent = componentLayoutParent;
		this.componentName = componentName;
	}

	/**
	 * Retrieves the generated component node as a string.
	 *
	 * @returns {string} The generated component node.
	 */
	get generatedComponentNode (): string {
		return this.componentNode;
	}

	/**
	 * Converts the styles of the component into a string representation.
	 *
	 * @private
	 * @param {CustomComponentStyles} styles - The styles of the component.
	 * @returns {string} A string representation of the styles.
	 */
	private convertStylesToString (styles: CustomComponentStyles): string {
		return Object.entries(styles)
			.filter(([, value]) => value)
			.map(([key, value]) => {
				// Exclude 'top' and 'left' if the component is a Button
				// in the demo we have Buttons inside Layout components, and they need to be aligned automatically, not forced with 'top' and 'left'
				// also excluded 'color' for now, so that Spotlight works and color is not enforced
				if (this.componentName === COMPONENTS.BUTTON && (key === 'top' || key === 'left' || key === 'color') && this.hasComponentLayoutParent) {
					return null;
				}
				if (this.componentName === COMPONENTS.BUTTON && (key === 'backgroundColor' || key === 'color')) {
					return this.handleButtonStyles(key, value);
				} else if (value.includes('rgb')) {
					return `${key}: '${value}'`;
				} else if (key.includes('padding')) {
					return `${value}`;
				} else {
					return `${key}: ${value}`;
				}
			})
			.filter(Boolean) // Remove any nulls from the map
			.join(', ');
	}

	/**
	 * Converts the properties of the component into a string representation.
	 *
	 * @private
	 * @param {CustomComponentProperties} props - The properties of the component.
	 * @returns {string} A string representation of the properties.
	 */
	private convertPropertiesToString (props: CustomComponentProperties): string {
		return Object.entries(props)
			.filter(([key, value]) => {
				const formattedKey = key.split('#')[0];

				return formattedKey !== 'children' &&
					formattedKey !== 'showColor' &&
					formattedKey !== 'showIcon' &&
					formattedKey !== 'showTooltip' &&
					value;
			})
			.map(([key, value]) => {
				const formattedKey = key.split('#')[0];

				if (value === 'true' || value === true || value === 'false' || value === false) {
					return `${formattedKey}={${value}}`;
				}

				return `${formattedKey}={'${value}'}`;
			})
			.join(' ');
	}

	/**
	 * Handles the specific styles for a Button component.
	 *
	 * @private
	 * @param {string} key - The style property key.
	 * @param {string} value - The style property value.
	 * @returns {string} A string representation of the style for the Button component.
	 */
	private handleButtonStyles (key: string, value: string): string {
		if (key === 'backgroundColor') {
			return `'--sand-component-bg-color': '${value}'`;
		} else if (key === 'color') {
			const rgbValue = value.split('rgb(')[1].split(')')[0].split(', ');
			return `'--sand-component-text-color-rgb': '${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]}'`;
		}
	}

	/**
	 * Adds properties to the component node.
	 *
	 * @param {CustomComponentProperties} props - The properties to add to the component node.
	 * @returns {EnactComponentNode} The current instance for chaining.
	 */
	addComponentProps (props: CustomComponentProperties): EnactComponentNode {
		const tag = `<${this.componentName}`;
		let tagWithProps = '';

		switch (this.componentName) {
			case COMPONENTS.BUTTON:
				tagWithProps = `<${this.componentName} ${this.convertPropertiesToString(props)}`;
				this.componentNode = this.componentNode.replace(tag, tagWithProps);
				return this;
			case LAYOUT_COMPONENTS.CELL:
				tagWithProps = `<${this.componentName} align={'${props.align}'}${props.shrink ? ' shrink' : ''}`;
				this.componentNode = this.componentNode.replace(tag, tagWithProps);
				return this;
			case LAYOUT_COMPONENTS.COLUMN:
			case LAYOUT_COMPONENTS.LAYOUT:
				tagWithProps = `<${this.componentName}`;
				this.componentNode = this.componentNode.replace(tag, tagWithProps);
				return this;
			case COMPONENTS.VIRTUALLIST:
				const itemRenderer = `() => <${props.virtualListItem}>${props.virtualListItem}</${props.virtualListItem}>`;
				tagWithProps = `<${this.componentName} dataSize={10} itemRenderer={${itemRenderer}} itemSize={60}`;
				this.componentNode = this.componentNode.replace(tag, tagWithProps);
				return this;
			default:
				return this;
		}
	}

	/**
	 * Adds styles to the component node.
	 *
	 * @param {CustomComponentStyles} styles - The styles to add to the component node.
	 * @returns {EnactComponentNode} The current instance for chaining.
	 */
	addComponentStyle (styles: CustomComponentStyles): EnactComponentNode {
		const tag = `<${this.componentName}`;
		const convertedStyles = this.convertStylesToString(styles);
		const componentPosition = (convertedStyles.length > 0 ? ', ' : '').concat(`position: 'absolute'`);
		const componentStyle = convertedStyles.concat(this.hasComponentLayoutParent ? '' : componentPosition);

		switch (this.componentName) {
			case COMPONENTS.BUTTON:
			case LAYOUT_COMPONENTS.CELL:
			case LAYOUT_COMPONENTS.COLUMN:
			case LAYOUT_COMPONENTS.LAYOUT:
			case LAYOUT_COMPONENTS.ROW:
				this.componentNode = this.componentNode.replace(tag, `<${this.componentName} style={{${componentStyle}}}`);
				return this;
			default:
				return this;
		}
	}

	/**
	 * Creates the component node with the specified child components.
	 *
	 * @param {string[]} childComponents - The child components to include in the node.
	 * @returns {EnactComponentNode} The current instance for chaining.
	 */
	public createComponent (childComponents: string[]): EnactComponentNode {
		switch (this.componentName) {
			case COMPONENTS.BUTTON:
				this.componentNode = childComponents ? `<${this.componentName}>${childComponents[0]}</${this.componentName}>` : `<${this.componentName} />`;
				return this;
			case LAYOUT_COMPONENTS.CELL:
			case LAYOUT_COMPONENTS.COLUMN:
			case LAYOUT_COMPONENTS.LAYOUT:
			case LAYOUT_COMPONENTS.ROW:
				this.componentNode = `<${this.componentName}>`;
				return this;
			case COMPONENTS.VIRTUALLIST:
				this.componentNode = `<${this.componentName} />`;
				return this;
			default:
				return this;
		}
	}
}

export default EnactComponentNode;
