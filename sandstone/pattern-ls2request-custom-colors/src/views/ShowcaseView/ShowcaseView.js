import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Dropdown from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import IconItem from '@enact/sandstone/IconItem';
import Popup from '@enact/sandstone/Popup';
import RangePicker from '@enact/sandstone/RangePicker';
import Slider from '@enact/sandstone/Slider';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import {useCallback, useContext, useEffect, useState} from 'react';

import {AppContext} from '../../constants';
// This is a function that receives a hex color and returns the same color in rgb format
// Due to our sandstone implementation some colors need to be in rgb format to be registered during customization
import {hexToRGB} from '../../utils';

import css from './ShowcaseView.module.less';

const ShowcaseView = ({navigate}) => {
	// Here we get the context of the app
	const {context} = useContext(AppContext);
	const [openPopup, setOpenPopup] = useState(false);

	const handleOpenPopup = useCallback(() => {
		setOpenPopup(!openPopup);
	}, [openPopup]);

	let screenWidth = typeof window !== 'undefined' ? window.screen.width : 0;
	let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
	let previewDropdownWidth = () => {
		if (screenWidth <= 1920) {
			if (windowWidth < 1080) {
				return 'tiny';
			} else {
				return 'medium';
			}
		} else if (screenWidth > 1920) {
			if (windowWidth < 2160) {
				return 'tiny';
			} else {
				return 'medium';
			}
		}
	};

	// Inside this useEffect we will apply the custom preset and customization colors for our app
	useEffect(() => {
		// Here we deconstruct the app's context in order to better show where each variable is used in the customization process
		const {
			colors,
			backgroundColor,
			componentBackgroundColor,
			focusBackgroundColor,
			popupBackgroundColor,
			subtitleTextColor,
			textColor
		} = context;

		// Here we apply the selected preset inside our app
		// In order to do so we create a new stylesheet in which we place the content of the colors variable
		// If you only wish to add the preset to customize your app you can stop after this if
		if (typeof document !== 'undefined') {
			const root = document.getElementById('root');
			const sheet = document.createElement('style');
			sheet.id = 'preset';
			sheet.innerHTML = colors;
			root.appendChild(sheet);
		}

		// If you wish to also add our customization colors, or you have other colors you wish to add here's how you do it
		if (typeof document !== 'undefined') {
			const root = document.getElementById('root');
			// First you need to create another stylesheet
			const sheet = document.createElement('style');
			// Then you give it an id in order to make it easier to create cleanup functions for it
			sheet.id = 'customize-colors';
			// Then as it's content you need to create the following string
			// The string is set here based on our customization variables from WebOS system,
			// but you can add your own colors if you wish
			// You need to pay attention to the name of the CSS property
			// If it ends on -rgb it expects its value to be an RGB color else it needs to be a hex color
			sheet.innerHTML = `.sandstone-theme {
			--sand-bg-color: ${backgroundColor};
			--sand-component-bg-color: ${componentBackgroundColor};
			--sand-focus-bg-color-rgb: ${hexToRGB(focusBackgroundColor)};
			--sand-overlay-bg-color-rgb: ${hexToRGB(popupBackgroundColor)};
			--sand-text-sub-color: ${subtitleTextColor};
			--sand-text-color-rgb: ${hexToRGB(textColor)};
			}`;
			// After that you need to append the new stylesheet to your app's root
			root.appendChild(sheet);
		}

		// Here we create a cleanup function to remove the stylesheets when we move to another view
		return () => {
			document.getElementById('preset')?.remove();
			document.getElementById('customize-colors')?.remove();
		};
	}, [context]);

	return (
		<Layout className={css.previewPanel}>
			<Cell className={css.previewSection}>
				<Column className={css.previewComponents}>
					<Heading className={css.previewTitle}>Theme Preview</Heading>
					<Layout align="center space-between">
						<Button css={css} size="small">Click</Button>
						<Button css={css} disabled size="small">Disabled</Button>
						<Button css={css} selected size="small">Selected</Button>
						<Button css={css} disabled selected size="small">Disabled</Button>
					</Layout>
					<CheckboxItem className={css.previewCheckboxItem} label="Here be label!">Checkbox</CheckboxItem>
					<SwitchItem className={css.previewSwitchItem} css={css}>Toggle</SwitchItem>
					<Slider className={css.previewSlider} />
					<RangePicker className={css.previewRangePicker} defaultValue={0} max={13} min={0} />
					<Dropdown className={css.previewDropdown} width={previewDropdownWidth()}>
						{['Item 1', 'Item 2', 'Item 3']}
					</Dropdown>
					<Button className={css.previewPopup} onClick={handleOpenPopup} size="small">
						Popup
					</Button>
					<Popup css={css} open={openPopup} position="right">
						<BodyText centered>Hello</BodyText>
						<Button onClick={handleOpenPopup} size="small">Bye</Button>
					</Popup>
					<Row className={css.footer}>
						<IconItem icon="picture" label="Presets" onClick={useCallback(() => navigate(0), [navigate])} />
						<IconItem icon="gear" label="Customization" onClick={useCallback(() => navigate(1), [navigate])} />
						<IconItem disabled icon="picturemode" label="Showcase" />
					</Row>
				</Column>
			</Cell>
		</Layout>
	);
};

ShowcaseView.propTypes = {
	navigate: PropTypes.func
};

export default ShowcaseView;
