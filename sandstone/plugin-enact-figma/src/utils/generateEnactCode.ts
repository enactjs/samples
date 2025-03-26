import createComponentImport from './createComponentImport';
import createComponentNode from './createComponentNode';
import CustomComponent from '../types/component.class';

/**
 * Creates Enact component nodes for a list of components.
 *
 * @param {CustomComponent[]} components - An array of custom components extracted from a Figma design.
 * @returns {string} A string representation of the generated component nodes.
 *
 *  * The function:
 *  * - Handles layout-related components (`Cell`, `Column`, `Row`) by nesting their children.
 *  * - Converts each component into an Enact component node using `createComponentNode`.
 *  * - Returns a string of all component nodes.
 */
const createComponents = (components: CustomComponent[]): string => {
	const allComponents = components.map((component) => {
		const {children, componentName} = component;

		if (componentName === 'Cell' || componentName === 'Column' || componentName === 'Row') {
			if (children && children.length > 0) {
				const childrenArray = children.map((child) => {
					return createComponentNode(child, componentName);
				});

				const parentsArray = createComponentNode(component);
				childrenArray.unshift(parentsArray);
				childrenArray.push(`</${componentName}>`);

				return childrenArray;
			} else {
				const componentNode = [createComponentNode(component)];
				componentNode.push(`</${componentName}>`);

				return componentNode;
			}
		}

		return createComponentNode(component);
	}).filter(componentNode => componentNode !== '');

	return allComponents.toString().replace(/,</g, '<');
};

/**
 * Generates the Enact code for a list of components.
 *
 * @param {CustomComponent[]} components - An array of custom components extracted from a Figma design.
 * @returns {string} The generated Enact code as a string.
 *
 * The function:
 * - Identifies whether `ContextualMenuDecorator` or `ContextualPopupDecorator` is used.
 * - Builds a nested structure of components based on their overlap.
 * - Generates the Enact code, including imports, decorators, and the main panel.
 */
const generateEnactCode = (components: CustomComponent[]): string => {
	/**
	 * Checks if a child component overlaps with a parent component.
	 *
	 * @param {CustomComponent} parent - The potential parent component.
	 * @param {CustomComponent} child - The child component to check.
	 * @returns {boolean} `true` if the child overlaps with the parent, otherwise `false`.
	 */
	function isOverlapping (parent: CustomComponent, child: CustomComponent): boolean {
		return (
			child.x >= parent.x &&
			child.y >= parent.y &&
			child.x + child.componentProps.width <= parent.x + parent.componentProps.width &&
			child.y + child.componentProps.height <= parent.y + parent.componentProps.height
		);
	}

	/**
	 * Builds a nested structure of components based on their overlap.
	 *
	 * @param {CustomComponent[]} componentTags - The list of components to nest.
	 * @returns {CustomComponent[]} A nested structure of components.
	 */
	function nestComponents (componentTags: CustomComponent[]): CustomComponent[] {
		const result = [];

		componentTags.forEach((component) => {
			// Find potential parents by checking overlap
			const parent = components.find(
				(potentialParent) =>
					potentialParent !== component && isOverlapping(potentialParent, component)
			);

			if (parent) {
				// If parent exists, initialize a children array if not present
				parent.children = parent.children || [];
				parent.children.push(component);
			} else {
				// If no parent found, it is a top-level component
				result.push(component);
			}
		});

		return result;
	}

	// Get the nested structure based on overlap
	const nestedComponents = nestComponents(components);

	return `${createComponentImport(components)}
		import kind from '@enact/core/kind';
		import {Scroller} from '@enact/sandstone/Scroller';
		import {Layout} from '@enact/ui/Layout';
		import ri from '@enact/ui/resolution';
		
			const MainPanel = kind({
				name: 'MainPanel',
			
				render: () => (
					<Scroller focusableScrollbar>
						<Layout>
							${createComponents(nestedComponents)}
						</Layout>
					</Scroller>
				)
			});
			
		export default MainPanel;`;
};

export default generateEnactCode;
