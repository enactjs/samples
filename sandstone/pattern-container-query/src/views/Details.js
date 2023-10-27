import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Image from '@enact/sandstone/Image';
import Item from '@enact/sandstone/Item';
import Marquee from '@enact/sandstone/Marquee';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ri from '@enact/ui/resolution';

// import css from './Details.module.less';

import css from '@enact/ui/Layout/Layout.module.less';

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
				<slotAfter>
					{DebugButton}
					<Button onClick={changeOrientation} selected={orientation} size="small">Flip Orientation</Button>
				</slotAfter>
			</Header>
			<Row className={classNames(css.layoutWapper)} style={{height: `calc(100% - ${ri.scale(48)}px)`}}>
				<Layout orientation='none' style={{height: '100%'}}>
					<Cell component={Image} style={{height: '100%', width: '100%', minWidth: '60%', margin: 0}} src="http://picsum.photos/480/320/" />
					<Cell shrink style={{padding: '0 1em', width: (orientation ? '80%' : null)}}>
						<Column className={classNames(css.layoutNormalWapper)}>
							<Cell shrink>
								<BodyText>By Grabthar&apos;s hammer, by the sons of Warvan, you shall be avenged.</BodyText>
							</Cell>
							<FieldRow component={Item} label="Director:" size="80%">Dean Parisot</FieldRow>
							<FieldRow component={Item} label="Writers:" size="80%">David Howard (story), David Howard (screenplay)</FieldRow>
							<FieldRow component={Item} label="Stars:" size="80%">Tim Allen, Sigourney Weaver, Alan Rickman</FieldRow>
						</Column>
					</Cell>
				</Layout>
			</Row>
		</Panel>
	)
});

export default Toggleable({prop: 'orientation', toggle: 'changeOrientation'}, Details);

// Text content lovingly borrowed from IMDB:
// http://www.imdb.com/title/tt0177789/
