import kind from '@enact/core/kind';
import Dropdown from '@enact/sandstone/Dropdown';
import PropTypes from 'prop-types';

import componentCss from './ImportSkin.module.less';

const ImportSkin = kind({
	name: 'ImportSkin',

	propTypes: {
		setColorsImport: PropTypes.func,
		setColorsPreset: PropTypes.func
	},

	handlers:{
		handleClose: async (ev, {setColorsImport, setColorsPreset}) => {
			document.querySelector('#temporaryStylesheet')?.remove();
			switch (ev.data) {
				case 'Default Sandstone Theme': {
					setColorsPreset('defaultTheme');
					break;
				}
				case 'Default Blue Theme': {
					setColorsPreset('defaultBlueTheme');
					break;
				}
				case 'Default Green Theme': {
					setColorsPreset('defaultGreenTheme');
					break;
				}
				case 'Default Purple Theme': {
					setColorsPreset('defaultPurpleTheme');
					break;
				}
				case 'Default Red Theme': {
					setColorsPreset('defaultRedTheme');
					break;
				}
				case 'Blue Theme': {
					setColorsPreset('blueTheme');
					break;
				}
				case 'Green Theme': {
					setColorsPreset('greenTheme');
					break;
				}
				case 'Purple Theme': {
					setColorsPreset('purpleTheme');
					break;
				}
				case 'Red Theme': {
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

			if (width < 1800) {
				if (width < 1080) {
					return 'medium';
				} else {
					return 'large';
				}
			} else {
				return 'x-large';
			}
		}
	},

	render:({size, handleClose, handleOpen}) => {
		return (
			<div className={componentCss.inputFile}>
				<Dropdown
					className={componentCss.presetDropdown}
					defaultSelected={0}
					onClose={handleClose}
					onOpen={handleOpen}
					width={size}
				>
					{[
						'Default Sandstone Theme',
						'Default Blue Theme',
						'Default Green Theme',
						'Default Purple Theme',
						'Default Red Theme',
						'Blue Theme',
						'Green Theme',
						'Purple Theme',
						'Red Theme',
						'Import your own'
					]}
				</Dropdown>
			</div>
		);
	}
});

export default ImportSkin;
