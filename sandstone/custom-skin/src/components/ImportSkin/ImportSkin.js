import kind from '@enact/core/kind';
import platform from '@enact/core/platform';
import Dropdown from '@enact/sandstone/Dropdown';
import PropTypes from 'prop-types';

import componentCss from './ImportSkin.module.less';

const ImportSkin = kind({
	name: 'ImportSkin',

	propTypes: {
		setColorsImport: PropTypes.func,
		setColorsPreset: PropTypes.func
	},

	defaultProps: {
		colorPresets: [
			'Default Sandstone Theme',
			'Blue Theme 1',
			'Blue Theme 2',
			'Green Theme 1',
			'Green Theme 2',
			'Purple Theme 1',
			'Purple Theme 2',
			'Red Theme 1',
			'Red Theme 2'
		]
	},

	handlers:{
		handleClose: async (ev, {setColorsImport, setColorsPreset}) => {
			document.querySelector('#temporaryStylesheet')?.remove();
			switch (ev.data) {
				case 'Default Sandstone Theme': {
					setColorsPreset('defaultTheme');
					break;
				}
				case 'Blue Theme 1': {
					setColorsPreset('defaultBlueTheme');
					break;
				}
				case 'Green Theme 1': {
					setColorsPreset('defaultGreenTheme');
					break;
				}
				case 'Purple Theme 1': {
					setColorsPreset('defaultPurpleTheme');
					break;
				}
				case 'Red Theme 1': {
					setColorsPreset('defaultRedTheme');
					break;
				}
				case 'Blue Theme 2': {
					setColorsPreset('blueTheme');
					break;
				}
				case 'Green Theme 2': {
					setColorsPreset('greenTheme');
					break;
				}
				case 'Purple Theme 2': {
					setColorsPreset('purpleTheme');
					break;
				}
				case 'Red Theme 2': {
					setColorsPreset('redTheme');
					break;
				}
				case 'Import your own': {
					function inputHandler (inputEvent) {
						inputEvent.preventDefault();
						const reader = new window.FileReader();
						reader.onload = async (event) => {
							let text = (event.target.result).split('\n\t');
							text.shift();
							text = text.filter(string => {
								if (string[0] !== '/' || string.includes('/* Skin Name')) {
									return string;
								}
							});
							setColorsImport(text);
						};
						try {
							reader.readAsText(inputEvent.target.files[0]);
						} catch (err) {
							// eslint-disable-next-line
							console.log(err);
						}
					}

					const input = document.createElement('input');
					input.type = 'file';
					input.onchange = inputHandler;
					input.id = 'temporaryInput';
					input.click();
					break;
				}
				default: break;
			}
		},
		handleOpen: async () => {
			const sheet = document.createElement('style');
			sheet.id = 'temporaryStylesheet';
			sheet.innerHTML = `.sandstone-theme {
				--sand-selected-text-color: #E6E6E6;
				--sand-overlay-bg-color-rgb: 87, 94, 102;
				--sand-focus-bg-color: #E6E6E6;
				--sand-component-focus-text-color-rgb: 76, 80, 89;
				--sand-shadow-color-rgb: none;
			}`;
			document.body?.appendChild(sheet);

			setTimeout(() => {
				let dropdown = document.querySelector('[role="list"]');
				dropdown.style.color = '#E6E6E6';
			});
		}
	},

	computed: {
		size: () => {
			const width = window.innerWidth;

			if (window.screen.width <= 1920) {
				if (width < 1080) {
					return 'medium';
				} else if (width > 1080 && width < 1800) {
					return 'large';
				} else {
					return 'x-large';
				}
			} else if (window.screen.width > 1920) {
				if (width < 2160) {
					return 'medium';
				} else if ( width > 2160 && width < 3600) {
					return 'large';
				} else {
					return 'x-large';
				}
			}
		}
	},

	render:({colorPresets, handleClose, handleOpen, size}) => {
		return (
			<div className={componentCss.inputFile}>
				<Dropdown
					className={componentCss.presetDropdown}
					defaultSelected={0}
					onClose={handleClose}
					onOpen={handleOpen}
					width={size}
				>
					{platform.webos ? colorPresets : [...colorPresets, 'Import your own']}
				</Dropdown>
			</div>
		);
	}
});

export default ImportSkin;
