import {Column} from '@enact/ui/Layout';
import {Button} from '@enact/sandstone/Button';

import kind from '@enact/core/kind';
import {Scroller} from '@enact/sandstone/Scroller';
import {Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Scroller focusableScrollbar>
			<Layout>
				<Column
					style={{
						backgroundColor: 'rgb(255, 221, 109)',
						borderRadius: 0,
						height: ri.scaleToRem(2304),
						left: ri.scaleToRem(0),
						opacity: 1,
						top: ri.scaleToRem(0),
						width: ri.scaleToRem(1527),
						position: 'absolute'
					}}
				>
					<Button
						disabled={false}
						backgroundOpacity={'opaque'}
						iconPosition={'before'}
						minWidth={true}
						roundBorder={false}
						selected={false}
						shadowed={false}
						size={'large'}
						color={'red'}
						icon={'accessibility'}
						iconFlip={'auto'}
						style={{
							'--sand-component-bg-color': 'rgb(125, 132, 140)',
							borderRadius: 12,
							fontSize: ri.scaleToRem(60),
							height: ri.scaleToRem(112),
							opacity: 1,
							paddingRight: ri.scaleToRem(48),
							paddingLeft: ri.scaleToRem(48),
							width: ri.scaleToRem(385)
						}}
					>
						Button
					</Button>
				</Column>
				<Button
					disabled={false}
					backgroundOpacity={'opaque'}
					iconPosition={'before'}
					minWidth={true}
					roundBorder={false}
					selected={false}
					shadowed={false}
					size={'large'}
					color={'red'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(112),
						left: ri.scaleToRem(2766),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(356),
						width: ri.scaleToRem(325),
						position: 'absolute'
					}}
				>
					Button
				</Button>
				<Button
					disabled={false}
					backgroundOpacity={'opaque'}
					iconPosition={'before'}
					minWidth={true}
					roundBorder={false}
					selected={false}
					shadowed={false}
					size={'large'}
					style={{
						'--sand-component-bg-color': 'rgb(65, 129, 202)',
						borderRadius: 35,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(463),
						left: ri.scaleToRem(2170),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(1364),
						width: ri.scaleToRem(759),
						position: 'absolute'
					}}
				>
					Button
				</Button>
				<Button
					disabled={false}
					backgroundOpacity={'opaque'}
					iconPosition={'before'}
					minWidth={true}
					roundBorder={false}
					selected={false}
					shadowed={false}
					size={'large'}
					icon={'accessibility'}
					iconFlip={'auto'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(180),
						left: ri.scaleToRem(1947),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(743),
						width: ri.scaleToRem(514),
						position: 'absolute'
					}}
				>
					Button
				</Button>
			</Layout>
		</Scroller>
	)
});

export default MainPanel;
