import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Scroller from '@enact/sandstone/Scroller';
import Switch from '@enact/sandstone/Switch';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {useEffect, useState} from 'react';

import AutoPopup from '../components/AutoPopup';
import ColorFields from '../components/ColorFields';
import OutputField from '../components/OutputField';

import {checkColors, generateColors, hexColors} from '../utils';

import css from './MainPanel.module.less';

const MainPanel = () => {
	const [skinName, setSkinName] = useState('Custom Skin');
	const [BGColor, setBGColor] = useState('#FFFFFF');
	const [FBColor, setFBColor] = useState('#FFFFFF');
	const [FTCBlue, setFTCBlue] = useState('255');
	const [FTCGreen, setFTCGreen] = useState('255');
	const [FTCRed, setFTCRed] = useState('255');
	const [NTColor, setNTColor] = useState('#FFFFFF');
	const [OPBCBlue, setOPBCBlue] = useState('255');
	const [OPBCGreen, setOPBCGreen] = useState('255');
	const [OPBCRed, setOPBCRed] = useState('255');
	const [SBColor, setSBColor] = useState('#FFFFFF');
	const [SCBlue, setSCBlue] = useState('255');
	const [SCColor, setSCColor] = useState('#FFFFFF');
	const [SCGreen, setSCGreen] = useState('255');
	const [SCRed, setSCRed] = useState('255');
	const [TOColor, setTOColor] = useState('#FFFFFF');
	const [TOffBColor, setTOffBColor] = useState('#FFFFFF');
	const [TOnBColor, setTOnBColor] = useState('#FFFFFF');

	const [auto, setAuto] = useState(false);
	const [openWarning, setOpenWarning] = useState(false);
	const [AutoColors, setAutoColors] = useState([]);

	const Colors = [SCColor, FTCRed, FTCGreen, FTCBlue, FBColor, SCRed, SCGreen,
		SCBlue, SBColor, OPBCRed, OPBCGreen, OPBCBlue, TOnBColor, TOColor, TOffBColor];

	const setColors = [setSCColor, setFTCRed, setFTCGreen, setFTCBlue, setFBColor, setSCRed, setSCGreen,
		setSCBlue, setSBColor, setOPBCRed, setOPBCGreen, setOPBCBlue, setTOnBColor, setTOColor, setTOffBColor];

	useEffect(() => {
		if (hexColors(BGColor, NTColor)) {
			setAutoColors(generateColors(NTColor, BGColor));
		}
	}, [BGColor, NTColor]);

	function setColorsToAuto () {
		for (let i = 0; i < setColors.length; ++i) {
			setColors[i](AutoColors[i]);
		}
	}

	function onChangeInput (props) {
		const event = props?.event;
		const name = props?.name;
		const color = props?.color;
		const value = event?.value;

		switch (name) {
			case 'Skin Name': {
				setSkinName(value);
				break;
			}
			case 'Background color': {
				setBGColor(value);
				break;
			}
			case 'Normal Text color': {
				setNTColor(value);
				break;
			}
			case 'Subtitle color': {
				setSCColor(value);
				break;
			}
			case 'Focused text color (RGB)': {
				switch (color) {
					case 'red' : {
						setFTCRed(value);
						break;
					}
					case 'green': {
						setFTCGreen(value);
						break;
					}
					case 'blue': {
						setFTCBlue(value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Focused Background color': {
				setFBColor(value);
				break;
			}
			case 'Selected color (RGB)': {
				switch (color) {
					case 'red' : {
						setSCRed(value);
						break;
					}
					case 'green': {
						setSCGreen(value);
						break;
					}
					case 'blue': {
						setSCBlue(value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Selected Background Color': {
				setSBColor(value);
				break;
			}
			case 'Overlay Panel Background Color (RGB)': {
				switch (color) {
					case 'red' : {
						setOPBCRed(value);
						break;
					}
					case 'green': {
						setOPBCGreen(value);
						break;
					}
					case 'blue': {
						setOPBCBlue(value);
						break;
					}
					default:
						break;
				}
				break;
			}
			case 'Toggle On Background Color': {
				setTOnBColor(value);
				break;
			}
			case 'Toggle Off Color': {
				setTOColor(value);
				break;
			}
			case 'Toggle Off Background Color': {
				setTOffBColor(value);
				break;
			}
			default: break;
		}
	}

	function onChangeSwitch () {
		if (auto) {
			setAuto(!auto);
		} else {
			// eslint-disable-next-line
			if (!checkColors(Colors, AutoColors)) {
				setOpenWarning(true);
			} else {
				setAuto(!auto);
			}
		}
	}

	return (
		<Scroller>
			<div className={css.mainPanel}>
				<Heading size="large">Custom skin generator_</Heading>
				<Layout orientation="vertical">
					<Row>
						<Cell>
							<AutoPopup
								auto={auto}
								openWarning={openWarning}
								setAuto={setAuto}
								setColorsToAuto={setColorsToAuto}
								setOpenWarning={setOpenWarning}
							/>
							<BodyText className={css.switchLabel}>Generate colors automatically</BodyText>
							<Switch selected={auto} onClick={onChangeSwitch} />
							<ColorFields
								auto={auto}
								AutoColors={AutoColors}
								BGColor={BGColor}
								Colors={Colors}
								name={skinName}
								NTColor={NTColor}
								onChangeInput={onChangeInput}
							/>
						</Cell>
						<Cell size="30%">
							<Heading>Component Preview</Heading>
							<Button>Click me</Button>
							<SwitchItem>Toggle me</SwitchItem>
						</Cell>
					</Row>
					<Row>
						<OutputField
							colors={
								!auto ? [skinName, BGColor, NTColor, ...Colors] : [skinName, BGColor, NTColor, ...AutoColors]
							}
						/>
					</Row>
				</Layout>
			</div>
		</Scroller>
	);
};

export default MainPanel;
