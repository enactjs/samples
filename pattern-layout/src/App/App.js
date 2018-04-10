import React from 'react';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Toggleable from '@enact/ui/Toggleable';
import Button from '@enact/moonstone/Button';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import FavoritesList from '../views/FavoritesList';
import Details from '../views/Details';
import MainPanel from '../views/MainPanel';

// import css from './App.less';

// Import a directory of images fromStackOverflow
// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll (r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}
const thumbs = importAll(require.context('../views/thumbs', false, /\.(png|jpe?g|svg)$/));


const items = [];

const itemPusher = (title, subTitle, component, image) => {
	items.push({
		title,
		subTitle,
		component,
		image
	});
};

// Add all of our Layout Patterns
itemPusher('Favorites List', 'Two list columns with focusable buttons in the center', FavoritesList, thumbs['favorites-list.png']);
itemPusher('Details View', 'Show off details about an item', Details, thumbs['details.png']);


const App = kind({
	name: 'LayoutApp',

	propTypes: {
		debug: PropTypes.bool,
		onChangePanel: PropTypes.func,
		SecondaryPanel: PropTypes.func,
		selectedItem: PropTypes.object,
		toggleDebug: PropTypes.func
	},

	computed: {
		DebugButton: ({toggleDebug, debug}) => <Button onClick={toggleDebug} selected={debug} small>Layout Borders</Button>
	},

	render: ({debug, DebugButton, onChangePanel, SecondaryPanel, selectedItem, ...rest}) => {
		delete rest.toggleDebug;
		return (
			<ActivityPanels {...rest}>
				<MainPanel onChangePanel={onChangePanel} items={items} />
				{
					SecondaryPanel ?
						<SecondaryPanel
							className={debug ? 'debug' : ''}
							DebugButton={DebugButton}
							title={selectedItem.title}
							titleBelow={selectedItem.subTitle}
						/> :
						null
				}
			</ActivityPanels>
		);
	}
});

const AppDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'AppDecorator'

		static propTypes = {
			index: PropTypes.number,
			itemIndex: PropTypes.number
		}

		static defaultProps = {
			index: 0
		}

		constructor (props) {
			super(props);
			this.state = {
				index: this.props.index,
				itemIndex: 0
			};
		}

		handleSelectBreadcrumb = ({index}) => this.setState({index})

		onChangePanel = (props) => {
			this.setState({itemIndex: props.index, index: this.state.index + 1});
		}

		render () {
			return <Wrapped
				{...this.props}
				index={this.state.index}
				onChangePanel={this.onChangePanel}
				onSelectBreadcrumb={this.handleSelectBreadcrumb}
				SecondaryPanel={items[this.state.itemIndex].component}
				selectedItem={items[this.state.itemIndex]}
			/>;
		}
	};
});

export default compose(
	MoonstoneDecorator,
	AppDecorator,
	Toggleable({prop: 'debug', toggle: 'toggleDebug'})
)(App);
