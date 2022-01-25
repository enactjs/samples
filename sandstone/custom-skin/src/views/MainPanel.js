import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Dropdown from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import RangePicker from '@enact/sandstone/RangePicker';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import {useEffect, useState} from 'react';

import AutoPopup from '../components/AutoPopup/AutoPopup';
import ColorFields from '../components/ColorFields/ColorFields';
import ImportSkin from '../components/ImportSkin/ImportSkin';
import OutputField from '../components/OutputField/OutputField';

import {
	convertRGBToHex,
	generateColors,
	generateCSS,
	getColorsFromString,
	hexColors
} from '../utils';

import styles from '../common/styles.module.less';
import css from './MainPanel.module.less';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

function scrollTo (ref) {
	scrollTo = ref; //eslint-disable-line
}

const MainPanel = () => {
	const [skinName, setSkinName] = useState('');

	const [BGColor, setBGColor] = useState('#000000');
	const [TextColor, setTextColor] = useState('#E6E6E6');
	const [TextSubColor, setTextSubColor] = useState('#ABAEB3');
	const [ShadowColorRGB, setShadowColorRGB] = useState('#000000');
	const [ComponentTextColor, setComponentTextColor] = useState('#E6E6E6');
	const [ComponentBGColor, setComponentBGColor] = useState('#7D848C');
	const [FocusTextColor, setFocusTextColor] = useState('#FFFFFF');
	const [FocusBGColor, setFocusBGColor] = useState('#E6E6E6');
	const [ComponentFocusTextColorRGB, setComponentFocusTextColorRGB] = useState('#4C5059');
	const [SelectedColorRGB, setSelectedColorRGB] = useState('#E6E6E6');
	const [SelectedTextColor, setSelectedTextColor] = useState('#E6E6E6');
	const [SelectedBGColor, setSelectedBGColor] = useState('#3E454D');
	const [DisabledFocusBGColor, setDisabledFocusBGColor] = useState('#ABAEB3');
	const [DisabledSelectedColor, setDisabledSelectedColor] = useState('#4C5059');
	const [DisabledSelectedBGColor, setDisabledSelectedBgColor] = useState('#E6E6E6');
	const [DisabledSelectedFocusColor, setDisabledSelectedFocusColor] = useState('#E6E6E6');
	const [DisabledSelectedFocusBGColor, setDisabledSelectedFocusBGColor] = useState('#4C5059');
	const [FullscreenBGColor, setFullscreenBGColor] = useState('#000000');
	const [OverlayBGColorRGB, setOverlayBGColorRGB] = useState('#575E66');
	const [SelectionColor, setSelectionColor] = useState('#4C5059');
	const [SelectionBGColor, setSelectionBGColor] = useState('#3399FF');
	const [ToggleOffColor, setToggleOffColor] = useState('#AEAEAE');
	const [ToggleOffBGColor, setToggleOffBGColor] = useState('#777777');
	const [ToggleOnColor, setToggleOnColor] = useState('#E6E6E6');
	const [ToggleOnBGColor, setToggleOnBGColor] = useState('#30AD6B');
	const [ProgressColorRGB, setProgressColorRGB] = useState('#E6E6E6');
	const [ProgressBufferColor, setProgressBufferColor] = useState('#6B6D73');
	const [ProgressBGColor, setProgressBGColor] = useState('#373A41');
	const [ProgressSliderColor, setProgressSliderColor] = useState('#8D9298');
	const [CheckboxColor, setCheckboxColor] = useState('#E6E6E6');
	const [ItemDisabledFocusBGColor, setItemDisabledFocusBGColor] = useState('#E6E6E6');
	const [KeyguideBGColorRGB, setKeyguideBGColorRGB] = useState('#6B6D73');
	const [AlertOverlayBGColorRGB, setAlertOverlayBGColorRGB] = useState('#CACBCC');
	const [AlertOverlayTextColor, setAlertOverlayTextColor] = useState('#2E3239');
	const [AlertOverlayTextSubColor, setAlertOverlayTextSubColor] = useState('#2E3239');
	const [AlertOverlayFocusTextColor, setAlertOverlayFocusTextColor] = useState('#575E66');
	const [AlertOverlayDisabledSelectedColor, setAlertOverlayDisabledSelectedColor] = useState('#FFFFFF');
	const [AlertOverlayDisabledSelectedBGColor, setAlertOverlayDisabledSelectedBGColor] = useState('#788688');
	const [AlertOverlayDisabledSelectedFocusColor, setAlertOverlayDisabledSelectedFocusColor] = useState('#E6E6E6');
	const [AlertOverlayDisabledSelectedFocusBGColor, setAlertOverlayDisabledSelectedFocusBGColor] = useState('#4C5059');
	const [AlertOverlayProgressColorRGB, setAlertOverlayProgressColorRGB] = useState('#6B6D73');
	const [AlertOverlayProgressBGColor, setAlertOverlayProgressBGColor] = useState('#A1A1A1');
	const [AlertOverlayCheckboxColor, setAlertOverlayCheckboxColor] = useState('#858B92');
	const [AlertOverlayCheckboxDisabledSelectedColor, setAlertOverlayCheckboxDisabledSelectedColor] = useState('#FFFFFF');
	const [AlertOverlayFormcheckboxitemFocusTextColor, setAlertOverlayFormcheckboxitemFocusTextColor] = useState('#575E66');
	const [AlertOverlayItemDisabledFocusBGColor, setAlertOverlayItemDisabledFocusBGColor] = useState('#989CA2');

	const colors = [BGColor, TextColor, TextSubColor, ShadowColorRGB, ComponentTextColor, ComponentBGColor, FocusTextColor, FocusBGColor, ComponentFocusTextColorRGB,
		SelectedColorRGB, SelectedTextColor, SelectedBGColor, DisabledFocusBGColor, DisabledSelectedColor, DisabledSelectedBGColor, DisabledSelectedFocusColor,
		DisabledSelectedFocusBGColor, FullscreenBGColor, OverlayBGColorRGB, SelectionColor, SelectionBGColor, ToggleOffColor, ToggleOffBGColor, ToggleOnColor, ToggleOnBGColor,
		ProgressColorRGB, ProgressBufferColor, ProgressBGColor, ProgressSliderColor, CheckboxColor, ItemDisabledFocusBGColor, KeyguideBGColorRGB, AlertOverlayBGColorRGB,
		AlertOverlayTextColor, AlertOverlayTextSubColor, AlertOverlayFocusTextColor, AlertOverlayDisabledSelectedColor, AlertOverlayDisabledSelectedBGColor,
		AlertOverlayDisabledSelectedFocusColor, AlertOverlayDisabledSelectedFocusBGColor, AlertOverlayProgressColorRGB, AlertOverlayProgressBGColor, AlertOverlayCheckboxColor,
		AlertOverlayCheckboxDisabledSelectedColor, AlertOverlayFormcheckboxitemFocusTextColor, AlertOverlayItemDisabledFocusBGColor
	];

	const setColors = [setBGColor, setTextColor, setTextSubColor, setShadowColorRGB, setComponentTextColor, setComponentBGColor, setFocusTextColor, setFocusBGColor,
		setComponentFocusTextColorRGB, setSelectedColorRGB, setSelectedTextColor, setSelectedBGColor, setDisabledFocusBGColor, setDisabledSelectedColor,
		setDisabledSelectedBgColor, setDisabledSelectedFocusColor, setDisabledSelectedFocusBGColor, setFullscreenBGColor, setOverlayBGColorRGB,
		setSelectionColor, setSelectionBGColor, setToggleOffColor, setToggleOffBGColor, setToggleOnColor, setToggleOnBGColor, setProgressColorRGB, setProgressBufferColor,
		setProgressBGColor, setProgressSliderColor, setCheckboxColor, setItemDisabledFocusBGColor, setKeyguideBGColorRGB, setAlertOverlayBGColorRGB,
		setAlertOverlayTextColor, setAlertOverlayTextSubColor, setAlertOverlayFocusTextColor, setAlertOverlayDisabledSelectedColor, setAlertOverlayDisabledSelectedBGColor,
		setAlertOverlayDisabledSelectedFocusColor, setAlertOverlayDisabledSelectedFocusBGColor, setAlertOverlayProgressColorRGB, setAlertOverlayProgressBGColor,
		setAlertOverlayCheckboxColor, setAlertOverlayCheckboxDisabledSelectedColor, setAlertOverlayFormcheckboxitemFocusTextColor, setAlertOverlayItemDisabledFocusBGColor
	];

	const propNames = ['Background Color', 'Text Color', 'Text Sub Color', 'Shadow Color RGB', 'Component Text Color', 'Component Bg Color', 'Focus Text Color', 'Focus Bg Color',
		'Component Focus Text Color RGB', 'Selected Color RGB', 'Selected Text Color', 'Selected Bg Color', 'Disabled Focus Bg Color', 'Disabled Selected Color',
		'Disabled Selected Bg Color', 'Disabled Selected Focus Color', 'Disabled Selected Focus Bg Color', 'Fullscreen Bg Color', 'Overlay Bg Color RGB',
		'Selection Color', 'Selection Bg Color', 'Toggle Off Color', 'Toggle Off Bg Color', 'Toggle On Color', 'Toggle On Bg Color', 'Progress Color RGB',
		'Progress Buffer Color', 'Progress Bg Color', 'Progress Slider Color', 'Checkbox Color', 'Item Disabled Focus Bg Color', 'Keyguide Bg Color RGB',
		'Alert Overlay Bg Color RGB', 'Alert Overlay Text Color', 'Alert Overlay Text Sub Color', 'Alert Overlay Focus Text Color', 'Alert Overlay Disabled Selected Color',
		'Alert Overlay Disabled Selected Bg Color', 'Alert Overlay Disabled Selected Focus Color', 'Alert Overlay Disabled Selected Focus Bg Color',
		'Alert Overlay Progress Color RGB', 'Alert Overlay Progress Bg Color', 'Alert Overlay Checkbox Color', 'Alert Overlay Checkbox Disabled Selected Color',
		'Alert Overlay Formcheckboxitem Focus Text Color', 'Alert Overlay Item Disabled Focus Bg Color'
	];

	const varNames = ['--sand-bg-color', '--sand-text-color', '--sand-text-sub-color', '--sand-shadow-color-rgb', '--sand-component-text-color', '--sand-component-bg-color',
		'--sand-focus-text-color', '--sand-focus-bg-color', '--sand-component-focus-text-color-rgb', '--sand-selected-color-rgb', '--sand-selected-text-color',
		'--sand-selected-bg-color', '--sand-disabled-focus-bg-color', '--sand-disabled-selected-color', '--sand-disabled-selected-bg-color', '--sand-disabled-selected-focus-color',
		'--sand-disabled-selected-focus-bg-color', '--sand-fullscreen-bg-color', '--sand-overlay-bg-color-rgb', '--sand-selection-color', '--sand-selection-bg-color',
		'--sand-toggle-off-color', '--sand-toggle-off-bg-color', '--sand-toggle-on-color', '--sand-toggle-on-bg-color', '--sand-progress-color-rgb', '--sand-progress-buffer-color',
		'--sand-progress-bg-color', '--sand-progress-slider-color', '--sand-checkbox-color', '--sand-item-disabled-focus-bg-color', '--sand-keyguide-bg-color-rgb',
		'--sand-alert-overlay-bg-color-rgb', '--sand-alert-overlay-text-color', '--sand-alert-overlay-text-sub-color', '--sand-alert-overlay-focus-text-color',
		'--sand-alert-overlay-disabled-selected-color', '--sand-alert-overlay-disabled-selected-bg-color', '--sand-alert-overlay-disabled-selected-focus-color',
		'--sand-alert-overlay-disabled-selected-focus-bg-color', '--sand-alert-overlay-progress-color-rgb', '--sand-alert-overlay-progress-bg-color',
		'--sand-alert-overlay-checkbox-color', '--sand-alert-overlay-checkbox-disabled-selected-color', '--sand-alert-overlay-formcheckboxitem-focus-text-color',
		'--sand-alert-overlay-item-disabled-focus-bg-color'
	];

	const [alert, setAlert] = useState(false);
	const [auto, setAuto] = useState(false);
	const [changes, setChanges] = useState(0);
	const [openPopup, setOpenPopup] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);

	const setColorsToAuto = (autoColors) => {
		for (let i = 0; i < autoColors.length; i++) {
			setColors[i + 2](autoColors[i]);
		}
	};

	useEffect(() => {
		if (auto && hexColors(BGColor, TextColor)) {
			setColorsToAuto(generateColors(BGColor, TextColor));
		}
		// eslint-disable-next-line
	}, [auto, BGColor, TextColor]);

	function setColorsFromImport (newColors) {
		const colorSet = getColorsFromString(newColors);

		if (colorSet !== null) {
			setAuto(false);
			if (colorSet[0][0].includes('Skin Name')) {
				setSkinName(colorSet[0][1]);
				colorSet.shift();
			}
			colorSet.map((item) => {
				const index = varNames.indexOf(item[0]);
				if (index !== -1) {
					if (item[0].includes('rgb')) {
						const [r, g, b] = item[1].split(', ');
						setColors[index](convertRGBToHex([parseInt(r), parseInt(g), parseInt(b)]));
					} else {
						setColors[index](item[1]);
					}
				}
			});
		} else {
			setAlert(true);
		}
	}

	function onChangeInput (props) {
		const event = props?.event;
		const index = props?.index;
		const name = props?.name;
		let value = event?.value;

		if (name === 'Skin Name') {
			setSkinName(value);
		} else {
			setColors[index](value.toUpperCase());
			if (!auto) {
				setChanges(1);
			}
		}
	}

	function onChangeSwitch () {
		if (auto) {
			setAuto(!auto);
		} else {
			// eslint-disable-next-line
			if (changes !== 0) {
				setOpenWarning(true);
			} else {
				setAuto(!auto);
			}
		}
	}

	function handleOpenPopup () {
		setOpenPopup(!openPopup);
	}

	function turnAlertOff () {
		setAlert(false);
	}

	function setDefaultState () {
		setAuto(false);
		setBGColor('#000000');
		setTextColor('#E6E6E6');
		setTextSubColor('#ABAEB3');
		setShadowColorRGB('#000000');
		setComponentTextColor('#E6E6E6');
		setComponentBGColor('#7D848C');
		setFocusTextColor('#FFFFFF');
		setFocusBGColor('#E6E6E6');
		setComponentFocusTextColorRGB('#4C5059');
		setSelectedColorRGB('#E6E6E6');
		setSelectedTextColor('#E6E6E6');
		setSelectedBGColor('#3E454D');
		setDisabledFocusBGColor('#ABAEB3');
		setDisabledSelectedColor('#4C5059');
		setDisabledSelectedBgColor('#E6E6E6');
		setDisabledSelectedFocusColor('#E6E6E6');
		setDisabledSelectedFocusBGColor('#4C5059');
		setFullscreenBGColor('#000000');
		setOverlayBGColorRGB('#575E66');
		setSelectionColor('#4C5059');
		setSelectionBGColor('#3399FF');
		setToggleOffColor('#AEAEAE');
		setToggleOffBGColor('#777777');
		setToggleOnColor('#E6E6E6');
		setToggleOnBGColor('#30AD6B');
		setProgressColorRGB('#E6E6E6');
		setProgressBufferColor('#6B6D73');
		setProgressBGColor('#373A41');
		setProgressSliderColor('#8D9298');
		setCheckboxColor('#E6E6E6');
		setItemDisabledFocusBGColor('#E6E6E6');
		setKeyguideBGColorRGB('#6B6D73');
		setAlertOverlayBGColorRGB('#CACBCC');
		setAlertOverlayTextColor('#2E3239');
		setAlertOverlayTextSubColor('#2E3239');
		setAlertOverlayFocusTextColor('#575E66');
		setAlertOverlayDisabledSelectedColor('#FFFFFF');
		setAlertOverlayDisabledSelectedBGColor('#788688');
		setAlertOverlayDisabledSelectedFocusColor('#E6E6E6');
		setAlertOverlayDisabledSelectedFocusBGColor('#4C5059');
		setAlertOverlayProgressColorRGB('#6B6D73');
		setAlertOverlayProgressBGColor('#A1A1A1');
		setAlertOverlayCheckboxColor('#858B92');
		setAlertOverlayCheckboxDisabledSelectedColor('#FFFFFF');
		setAlertOverlayFormcheckboxitemFocusTextColor('#575E66');
		setAlertOverlayItemDisabledFocusBGColor('#989CA2');
	}

	function handleScrollTop () {
		return scrollTo({position: {x: 0, y: 0}});
	}

	const sheet = document.createElement('style');
	sheet.innerHTML = generateCSS(colors, skinName, varNames);
	document.body?.appendChild(sheet);

	let windowWidth = window.innerWidth;
	let previewDropdownWidth = () => {
		if (windowWidth < 1080) {
			return 'tiny';
		} else {
			return 'medium';
		}
	};

	return (
		<Layout className={css.mainPanel}>
			<Cell className={css.customizeSection}>
				<Scroller
					cbScrollTo={(fn) => {scrollTo = fn}} //eslint-disable-line
				>
					<Heading className={css.appTitle} size="large">Custom skin generator_</Heading>
					<Layout orientation="vertical">
						<Row>
							<Cell>
								<AutoPopup
									auto={auto}
									openWarning={openWarning}
									setAuto={setAuto}
									setChanges={setChanges}
									setOpenWarning={setOpenWarning}
								/>
								<Alert className={styles.customAlert} open={alert} type="overlay">
									<BodyText className={styles.customAlertMsg} centered size="small">Wrong type of file imported!</BodyText>
									<Button onClick={turnAlertOff} size="small">Close</Button>
								</Alert>
								<Row className={css.generateStyleContainer}>
									<Cell>
										<ImportSkin setColors={setColorsFromImport} />
									</Cell>
									<Cell>
										<BodyText className={css.switchLabel}>Generate colors automatically</BodyText>
										<Switch className={css.switchControl} onClick={onChangeSwitch} selected={auto} />
									</Cell>
								</Row>
								<ColorFields
									auto={auto}
									colors={colors}
									name={skinName}
									onChangeInput={onChangeInput}
									propNames={propNames}
								/>
							</Cell>
						</Row>
						<Row>
							<OutputField
								colors={colors}
								handleScrollTop={handleScrollTop}
								setDefaultState={setDefaultState}
								skinName={skinName}
								varNames={varNames}
							/>
						</Row>
						<Row>
							<TooltipButton className={css.topButton} css={css} icon="arrowlargeup" onClick={handleScrollTop} size="small" tooltipText="Scroll back to top of page">Back to top</TooltipButton>
						</Row>
					</Layout>
				</Scroller>
			</Cell>
			<Cell size="30%" className={css.previewSection}>
				<Column className={css.previewComponents}>
					<Heading className={css.previewTitle}>Live DEMO</Heading>
					<Row className={css.previewButtons}>
						<Button css={css} size="small">Click</Button>
						<Button css={css} disabled size="small">Disabled</Button>
						<Button css={css} selected size="small">Selected</Button>
						<Button css={css} disabled selected size="small">Disabled</Button>
					</Row>
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
				</Column>
			</Cell>
		</Layout>
	);
};

export default MainPanel;
