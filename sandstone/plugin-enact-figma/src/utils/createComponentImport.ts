/**
 * Generates import statements for a list of components.
 *
 * @param {{componentName: string}[]} components - An array of objects containing component names.
 * @returns {string} A string of import statements for the given components.
 */
const createComponentImport = (components: {componentName: string}[]): string => {
	const imports = [...new Set(components
		.map(component => component.componentName))]
		.map(name => {
			switch (name) {
				case 'Layout':
				case 'Row':
				case 'Column':
				case 'Cell':
					return `import { ${name} } from '@enact/ui/Layout';\n`;
				default:
					return `import { ${name} } from '@enact/sandstone/${name}';\n`;
			}
		});

	return imports.toString().replace(/,/g, '');
};

export default createComponentImport;
