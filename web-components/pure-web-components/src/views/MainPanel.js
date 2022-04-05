import kind from '@enact/core/kind';
import Heading from '@enact/sandstone/Heading';
import {Panel, Header} from '@enact/sandstone/Panels';

import {SimpleButton, SpottableButton} from '../components/Button';
import css from '../components/Button/Button.module.less';

const rest = {};

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<>
				<Heading>DOM element</Heading>

				A plain text
				<button>The standard button</button>

				<Heading>Using poc-button-simple</Heading>

				<poc-button-simple><button>With the standard button</button></poc-button-simple>
				<poc-button-simple>With a text</poc-button-simple>
				<poc-button-simple class={css.button}>With a text and size</poc-button-simple>
				<poc-button-simple class={css.button} {...rest}>
					<div slot="background" className={css.background} />
					<span slot="icon">🍭</span>
					<span>Click Me</span>
				</poc-button-simple>

				<Heading>Using poc-button-with-icon</Heading>

				<poc-button-with-icon><button>With the standard button</button></poc-button-with-icon>
				<poc-button-with-icon>With a text</poc-button-with-icon>
				<poc-button-with-icon class={css.button}>With a text and size</poc-button-with-icon>
				<poc-button-with-icon class={css.button} {...rest}>
					<div id="target" slot="background" className={css.background} />
					<span slot="icon">🍭</span>
					<span>Click Me</span>
				</poc-button-with-icon>

				<Heading>Using SimpleButton</Heading>

				<SimpleButton><button>With the standard button</button></SimpleButton>
				<SimpleButton>With a text</SimpleButton>

				<Heading>Using SpottableButton</Heading>

				<SpottableButton>With a text</SpottableButton>
				<SpottableButton icon={'🍭'} />
				<SpottableButton icon={'🍭'}>With a text</SpottableButton>
			</>
		</Panel>
	)
});

export default MainPanel;
