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
						backgroundColor: 'rgb(255, 255, 255)',
						borderRadius: 0,
						color: 'rgb(217, 217, 217)',
						height: ri.scaleToRem(2240),
						left: ri.scaleToRem(26),
						opacity: 1,
						top: ri.scaleToRem(22),
						width: ri.scaleToRem(1609),
						position: 'absolute'
					}}
				>
					<Button
						disabled={false}
						backgroundOpacity={'opaque'}
						iconPosition={'before'}
						minWidth={false}
						roundBorder={false}
						selected={false}
						shadowed={false}
						size={'large'}
						style={{
							'--sand-component-bg-color': 'rgb(125, 132, 140)',
							borderRadius: 12,
							fontSize: ri.scaleToRem(60),
							height: ri.scaleToRem(112),
							opacity: 1,
							paddingRight: ri.scaleToRem(24),
							paddingLeft: ri.scaleToRem(24),
							width: ri.scaleToRem(282)
						}}
					>
						Button
					</Button>
				</Column>
				<Button
					disabled={false}
					backgroundOpacity={'opaque'}
					iconPosition={'before'}
					minWidth={false}
					roundBorder={false}
					selected={false}
					shadowed={false}
					size={'large'}
					style={{
						'--sand-component-bg-color': 'rgb(53, 140, 239)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '237, 240, 55',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(355),
						left: ri.scaleToRem(2901),
						opacity: 1,
						paddingRight: ri.scaleToRem(24),
						paddingLeft: ri.scaleToRem(24),
						top: ri.scaleToRem(262),
						width: ri.scaleToRem(584),
						position: 'absolute'
					}}
				>
					Button
				</Button>
				<Button
					size={'small'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(108),
						left: ri.scaleToRem(1970),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(286),
						width: ri.scaleToRem(300),
						position: 'absolute'
					}}
				>
					undefined
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
					color={'red'}
					icon={'accessibility'}
					iconFlip={'auto'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(112),
						left: ri.scaleToRem(2105),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(778),
						width: ri.scaleToRem(385),
						position: 'absolute'
					}}
				>
					Button
				</Button>
				<Button
					disabled={true}
					size={'small'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(108),
						left: ri.scaleToRem(2587),
						opacity: 0.30000001192092896,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(1085),
						width: ri.scaleToRem(300),
						position: 'absolute'
					}}
				>
					undefined
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
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(112),
						left: ri.scaleToRem(1913),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(1243),
						width: ri.scaleToRem(275),
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
					color={'red'}
					icon={'accessibility'}
					iconFlip={'auto'}
					style={{
						'--sand-component-bg-color': 'rgb(125, 132, 140)',
						borderRadius: 12,
						'--sand-component-text-color-rgb': '230, 230, 230',
						fontSize: ri.scaleToRem(60),
						height: ri.scaleToRem(112),
						left: ri.scaleToRem(2617),
						opacity: 1,
						paddingRight: ri.scaleToRem(48),
						paddingLeft: ri.scaleToRem(48),
						top: ri.scaleToRem(1422),
						width: ri.scaleToRem(385),
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
