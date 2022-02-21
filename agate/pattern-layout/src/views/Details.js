import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import Image from '@enact/agate/Image';
import Item from '@enact/agate/Item';
import Marquee from '@enact/agate/Marquee';
import {Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';

const FieldRow = kind({
	name: 'FieldRow',
	propTypes: {
		label: PropTypes.string
	},
	render: ({label, ...rest}) => (
		<Cell shrink>
			<Row align="center">
				<Cell alignment="right" component={Marquee}>{label}</Cell>
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
			<Header subtitle={titleBelow} title={title}>
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
								<FieldRow component={Item} label="Director:" size="80%">Dean Parisot</FieldRow>
								<FieldRow component={Item} label="Writers:" size="80%">David Howard (story), David Howard (screenplay)</FieldRow>
								<FieldRow component={Item} label="Stars:" size="80%">Tim Allen, Sigourney Weaver, Alan Rickman</FieldRow>
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
