import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import ri from '@enact/ui/resolution';
import {Layout, Cell, Column, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import Marquee from '@enact/moonstone/Marquee';
import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import Image from '@enact/moonstone/Image';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';


const FieldRow = kind({
	name: 'FieldRow',
	propTypes: {
		label: PropTypes.string
	},
	render: ({label, ...rest}) => (
		<Cell shrink>
			<Row align="center">
				<Cell component={Marquee} alignment="right">{label}</Cell>
				<Cell {...rest} />
			</Row>
		</Cell>
	)
});

const Details = kind({
	name: 'Details',

	propTypes: {
		changeOrientation: PropTypes.func,
		DebugButton: PropTypes.object,
		orientation: PropTypes.bool,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string,
		titleBelow: PropTypes.string
	},

	render: ({DebugButton, changeOrientation, orientation, title, titleBelow, ...rest}) => (
		<Panel {...rest}>
			<Header title={title} titleBelow={titleBelow}>
				{DebugButton}
				<Button onClick={changeOrientation} selected={orientation} size="small">Flip Orientation</Button>
			</Header>
			<Row style={{height: '100%'}}>
				<Cell>
					<BodyText style={{margin: '0 ' + ri.unit(12, 'rem')}}>The alumni cast of a space opera television series have to play their roles as the real thing when an alien race needs their help. However, they also have to defend both Earth and the alien race from a reptilian warlord.</BodyText>
				</Cell>
				<Cell size="60%">
					<Layout orientation={orientation ? 'horizontal' : 'vertical'} style={{height: '100%'}}>
						<Cell component={Image} style={{height: '100%', width: '100%', minWidth: '10%', margin: 0}} src="http://picsum.photos/480/320/" />
						<Cell shrink style={{padding: '0 1em', width: (orientation ? '80%' : null)}}>
							<Column>
								<Cell shrink>
									<BodyText>By Grabthar&apos;s hammer, by the sons of Warvan, you shall be avenged.</BodyText>
								</Cell>
								<FieldRow size="80%" label="Director:" component={Item}>Dean Parisot</FieldRow>
								<FieldRow size="80%" label="Writers:" component={Item}>David Howard (story), David Howard (screenplay)</FieldRow>
								<FieldRow size="80%" label="Stars:" component={Item}>Tim Allen, Sigourney Weaver, Alan Rickman</FieldRow>
							</Column>
						</Cell>
					</Layout>
				</Cell>
			</Row>
		</Panel>
	)
});

export default Toggleable({prop: 'orientation', toggle: 'changeOrientation'}, Details);

// Text content lovingly borrowed from IMDB:
// http://www.imdb.com/title/tt0177789/
