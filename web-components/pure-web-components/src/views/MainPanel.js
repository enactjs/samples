import kind from '@enact/core/kind';
import Heading from '@enact/sandstone/Heading';
import {Panel, Header} from '@enact/sandstone/Panels';

import {ButtonSimple, ButtonWithIcon, SpottableButtonSimple, SpottableButtonWithIcon} from '../components/Button';
import css from './MainPanel.module.less';

const rest = {};

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<>
				<Heading>Using poc-button-simple</Heading>
				<div className={css.section}>
					<poc-button-simple><button>With the standard button</button></poc-button-simple>
					<poc-button-simple>With a text</poc-button-simple>
					<poc-button-simple class={css.button}>With a text and size</poc-button-simple>
					<poc-button-simple class={css.button} {...rest}>
						<div slot="background" className={css.background} />
						<span slot="icon">🍭</span>
						<span>Click Me</span>
					</poc-button-simple>
				</div>

				<Heading>Using poc-button-with-icon</Heading>
				<div className={css.section}>
					<poc-button-with-icon><button>With the standard button</button></poc-button-with-icon>
					<poc-button-with-icon>With a text</poc-button-with-icon>
					<poc-button-with-icon class={css.button}>With a text and size</poc-button-with-icon>
					<poc-button-with-icon class={css.button} {...rest}>
						<div id="target" slot="background" className={css.background} />
						<span slot="icon">🍭</span>
						<span>Click Me</span>
					</poc-button-with-icon>
				</div>

				<Heading>Using ButtonSimple</Heading>
				<div className={css.section}>
					<ButtonSimple><button>With the standard button</button></ButtonSimple>
					<ButtonSimple>With a text</ButtonSimple>
				</div>

				<Heading>Using ButtonWithIcon</Heading>
				<div className={css.section}>
					<ButtonWithIcon>With a text</ButtonWithIcon>
					<ButtonWithIcon icon={'🍭'} />
					<ButtonWithIcon icon={'🍭'}>With a text</ButtonWithIcon>
				</div>

				<Heading>Using SpottableButtonSimple</Heading>
				<div className={css.section}>
					<SpottableButtonSimple><button>With the standard button</button></SpottableButtonSimple>
					<SpottableButtonSimple>With a text</SpottableButtonSimple>
				</div>

				<Heading>Using SpottableButtonWithIcon</Heading>
				<div className={css.section}>
					<SpottableButtonWithIcon>With a text</SpottableButtonWithIcon>
					<SpottableButtonWithIcon icon={'🍭'} />
					<SpottableButtonWithIcon icon={'🍭'}>With a text</SpottableButtonWithIcon>
				</div>
			</>
		</Panel>
	)
});

export default MainPanel;
