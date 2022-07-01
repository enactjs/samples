import Heading from '@enact/sandstone/Heading';
import {Scroller} from '@enact/sandstone/Scroller';
import {useRef} from 'react';

import {ButtonSimple, ButtonWithIcon, SpottableButtonSimple, SpottableButtonWithIcon} from '../components/Button';
import css from './MainPanel.module.less';

const showEffect = (ref) => () => {
	const style = ref?.current?.style;
	if (style) {
		style.backgroundColor = 'green';
		setTimeout(() => {
			style.backgroundColor = null;
		}, 200);
	}
};

const Section = (props) => {
	return (
		<div {...props} className={css.section} />
	);
};

const MainPanel = (props) => {
	const ref = useRef({});
	const handleClick = ref.current ? showEffect(ref) : null;
	const handleLog = console.log;

	return (
		<>
			<div className={css.clickIndicator} ref={ref}>
				Clicked
			</div>
			<Scroller {...props}>
				<Section>
					<Heading>Using poc-button-simple</Heading>
					<poc-button-simple onClick={handleClick} onLog={handleLog}><button>Using a standard button</button></poc-button-simple>
					<poc-button-simple onClick={handleClick} onLog={handleLog}>Just text</poc-button-simple>
					<poc-button-simple onClick={handleClick} onLog={handleLog} class={css.button}>Text with Size</poc-button-simple>
					<poc-button-simple onClick={handleClick} onLog={handleLog} class={css.button}>
						<div slot="background" className={css.background} />
						<span slot="icon">🍭</span>
						<span>Click Me</span>
					</poc-button-simple>
				</Section>

				<div className={css.section}>
					<Heading>Using poc-button-with-icon</Heading>
					<poc-button-with-icon onClick={handleClick} onLog={handleLog}><button>Using a standard button</button></poc-button-with-icon>
					<poc-button-with-icon onClick={handleClick} onLog={handleLog}>Just text</poc-button-with-icon>
					<poc-button-with-icon onClick={handleClick} onLog={handleLog} class={css.button}>Text with Size</poc-button-with-icon>
					<poc-button-with-icon onClick={handleClick} onLog={handleLog} class={css.button}>
						<div id="target" slot="background" className={css.background} />
						<span slot="icon">🍭</span>
						<span>Click Me</span>
					</poc-button-with-icon>
				</div>

				<div className={css.section}>
					<Heading>Using ButtonSimple</Heading>
					<ButtonSimple onClick={handleClick} onLog={handleLog}><button>Using a standard button</button></ButtonSimple>
					<ButtonSimple onClick={handleClick} onLog={handleLog}>Just text</ButtonSimple>
				</div>

				<div className={css.section}>
					<Heading>Using ButtonWithIcon</Heading>
					<ButtonWithIcon onClick={handleClick} onLog={handleLog}>Just text</ButtonWithIcon>
					<ButtonWithIcon onClick={handleClick} onLog={handleLog} icon={'🍭'} />
					<ButtonWithIcon onClick={handleClick} onLog={handleLog} icon={'🍭'}>Click Me</ButtonWithIcon>
				</div>

				<div className={css.section}>
					<Heading>Using SpottableButtonSimple</Heading>
					<SpottableButtonSimple onClick={handleClick} onLog={handleLog}><button>Using a standard button</button></SpottableButtonSimple>
					<SpottableButtonSimple onClick={handleClick} onLog={handleLog}>Just text</SpottableButtonSimple>
				</div>

				<div className={css.section}>
					<Heading>Using SpottableButtonWithIcon</Heading>
					<SpottableButtonWithIcon onClick={handleClick} onLog={handleLog}>Just text</SpottableButtonWithIcon>
					<SpottableButtonWithIcon onClick={handleClick} onLog={handleLog} icon={'🍭'} />
					<SpottableButtonWithIcon onClick={handleClick} onLog={handleLog} icon={'🍭'}>Click Me</SpottableButtonWithIcon>
				</div>

				<div className={css.section}>
					End Line
				</div>
			</Scroller>
		</>
	);
};

export default MainPanel;
