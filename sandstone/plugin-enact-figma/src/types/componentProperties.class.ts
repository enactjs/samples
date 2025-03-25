/**
 * Represents the properties of a custom component extracted from a Figma design.
 * This class encapsulates various configurable properties of a component.
 */
class CustomComponentProperties {
	/**
	 * The alignment of the component.
	 */
	align?: string | boolean;
	/**
	 * The background opacity of the component, represented as a string or boolean.
	 */
	backgroundOpacity?: string | boolean;
	/**
	 * Indicates whether the component is disabled.
	 */
	disabled?: string | boolean;
	/**
	 * The position of the icon within the component.
	 */
	iconPosition?: string | boolean;
	/**
	 * The label text of the component.
	 */
	label?: string | boolean;
	/**
	 * The minimum width of the component.
	 */
	minWidth?: string | boolean;
	/**
	 * The placeholder text for the component (e.g., in input fields).
	 */
	placeholder?: string | boolean;
	/**
	 * Indicates whether the component has rounded borders.
	 */
	roundBorder?: string | boolean;
	/**
	 * Indicates whether the component is selected.
	 */
	selected?: string | boolean;
	/**
	 * Indicates whether the component has a shadow effect.
	 */
	shadowed?: string | boolean;
	/**
	 * Indicates whether the component should shrink to fit its content.
	 */
	shrink?: string | boolean;
	/**
	 * The size of the component.
	 */
	size?: string | boolean;
	/**
	 * The subtitle text of the component.
	 */
	subtitle?: string | boolean;
	/**
	 * The title text of the component.
	 */
	title?: string | boolean;
	/**
	 * A property specific to virtual list items.
	 */
	virtualListItem?: string;
}

export default CustomComponentProperties;
