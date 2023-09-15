import {useCallback, useState} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Dropdown from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import RangePicker from '@enact/sandstone/RangePicker';
import Slider from '@enact/sandstone/Slider';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column} from '@enact/ui/Layout';

import css from './PreviewSection.module.less';

const PreviewSection = () => {
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
		} else if ( screenWidth > 1920) {
			if (windowWidth < 2160) {
				return 'tiny';
			} else {
				return 'medium';
			}
		}
	};

	return (
		<Cell className={css.previewSection}>
			<Column className={css.previewComponents}>
				<Heading className={css.previewTitle}>Theme Preview</Heading>
				<div>
					<Button css={css} size="small">Click</Button>
					<Button css={css} disabled size="small">Disabled</Button>
					<Button css={css} selected size="small">Selected</Button>
					<Button css={css} disabled selected size="small">Disabled</Button>
				</div>
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
	);
};

export default PreviewSection;
