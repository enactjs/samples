import generateEnactCode from './utils/generateEnactCode';
import {CustomComponent} from "./types";

// Show the UI to the user
figma.showUI(__html__, {width: 1050, height: 650});

/**
 * Listens for messages from the plugin UI and handles them accordingly.
 *
 * Supported message types:
 * - `create`: Extracts components from the Figma file, generates Enact code, and sends it back to the UI.
 */
figma.ui.onmessage = (msg) => {
	if (msg.type === 'create') {
		/**
		 * Extracts components from the first frame in the current Figma page.
		 * Maps each component to an object containing its name, properties, children, and position.
		 */
		const components = (figma.currentPage.children[0] as FrameNode).children.map(component => {
			const componentProps = extractComponentProps(component as InstanceNode, component.name);
			const childrenProps = componentProps.children;
			const componentName = component.name;
			return {componentName, componentProps, childrenProps, x: component.x, y: component.y};
		});

		// Generate Enact code and send it to the UI
		generateCode(generateEnactCode(components as CustomComponent[]));
	}
};

/**
 * Extracts properties from a Figma component.
 *
 *  @param {InstanceNode} component - The Figma component to extract properties from.
 *  @param {string} componentName - The name of the component.
 *  @returns {InstanceNode} The extracted properties of the component.
 *
 * The function:
 * - Recursively extracts properties if the component has children.
 * - Returns the parent node if the component has no children.
 */
const extractComponentProps = (component: InstanceNode, componentName: string): InstanceNode => {
	if (typeof component.children !== 'undefined' && component.name === componentName) {
		return extractComponentProps(component.children[0] as InstanceNode, componentName);
	}

	return component as InstanceNode;
};

/**
 * Sends the generated Enact code to the plugin UI.
 *
 * @param {string} content - The generated Enact code as a string.
 */
const generateCode = (content: string) => {
	figma.ui.postMessage({type: 'show-code', data: content});
};
