import kind from '@enact/core/kind';
import BodyText from '@enact/ui/BodyText';
import Button from '@enact/ui/Button';
import Heading from '@enact/ui/Heading';
import Image from '@enact/ui/Image';
import Item from '@enact/ui/Item';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import Marquee from '@enact/ui/Marquee';
import ri from '@enact/ui/resolution';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';

import css from './Details.module.less';

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

	render: ({DebugButton, changeOrientation, orientation, title, titleBelow, ...rest}) => {
		delete rest.spotlightId;
		delete rest.hideChildren;

		return (
			<div {...rest} style={{height: '100%'}}>
				<Heading className={css.heading} size="title">
					{title}
					<div className={css.subtitle}>
						{titleBelow}
						<div>
							{DebugButton}
							<Button className={css.button} selected={orientation} size="small" onClick={changeOrientation}>Flip Orientation</Button>
						</div>
					</div>
				</Heading>
				<Row className={css.row}>
					<Cell>
						<BodyText style={{marginRight: ri.unit(12, 'rem')}}>The alumni cast of a space opera television series have to play their roles as the real thing when an alien race needs their help. However, they also have to defend both Earth and the alien race from a reptilian warlord.</BodyText>
					</Cell>
					<Cell size="60%">
						<Layout orientation={orientation ? 'horizontal' : 'vertical'} style={{height: '100%'}}>
							<Cell className={css.image} component={Image} src="http://picsum.photos/480/320/" />
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
			</div>
		);
	}
});

export default Toggleable({prop: 'orientation', toggle: 'changeOrientation'}, Details);

// Text content lovingly borrowed from IMDB:
// http://www.imdb.com/title/tt0177789/
