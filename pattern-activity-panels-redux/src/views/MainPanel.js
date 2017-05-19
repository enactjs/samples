import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {Component, PropTypes} from 'react';
import Scroller from '@enact/moonstone/Scroller';
import Item from '@enact/moonstone/Item';
import Spotlight from '@enact/spotlight';
import {PatternList} from './PatternList';

const dataArray = [];
for(let i=0;i<30;i++){
	dataArray.push('item' + i);
}

class MainPanel extends Component {
	static propTypes = {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	}

	componentDidMount () {
		//if (typeof this.scrollTo === 'function') {
			//setTimeout(() => {
			//	const node = document.querySelector(`[data-component-id=item15].spottable`);
			//	this.scrollTo({node, focus: true, animate: false});
			//}, 0);
		//}
	}

	getScrollTo = (fn) => {
		this.scrollTo = fn;
	}

	render () {
		const {title, onClick, ...rest} = this.props;
		return (
			<Panel {...rest}>
				<Header title={title}>
					<Button onClick={onClick}>Click me</Button>
				</Header>
				{/*<Scroller cbScrollTo={this.getScrollTo}>
					{
						dataArray.map((data, index) => {
							return <Item data-component-id={"item" + index} data-index={index} key={index}>{data}</Item>;
						})
					}
				</Scroller>*/}
				<PatternList index={rest['data-index']} onClick={onClick} />
				{/*<Scroller id="sampleMenu" cbScrollTo={this.getScrollTo}>
					<Button onClick={onClick}>1</Button>
					<br />
					<br />
					<Button onClick={onClick}>2</Button>
					<br />
					<br />
					<Button onClick={onClick}>3</Button>
					<br />
					<br />
					<Button onClick={onClick}>4</Button>
					<br />
					<br />
					<Button onClick={onClick}>5</Button>
					<br />
					<br />
					<Button onClick={onClick}>6</Button>
					<br />
					<br />
					<Button onClick={onClick}>7</Button>
					<br />
					<br />
					<Button onClick={onClick}>8</Button>
					<br />
					<br />
					<Button onClick={onClick}>9</Button>
					<br />
					<br />
					<Button onClick={onClick}>10</Button>
					<br />
					<br />
					<Button id="item11" onClick={onClick}>11</Button>
					<br />
					<br />
					<Button onClick={onClick}>12</Button>
					<br />
					<br />
					<Button onClick={onClick}>13</Button>
					<br />
					<br />
					<Button onClick={onClick}>14</Button>
					<br />
					<br />
					<Button onClick={onClick}>15</Button>
					<br />
					<br />
					<Button onClick={onClick}>16</Button>
					<br />
					<br />
					<Button onClick={onClick}>17</Button>
					<br />
					<br />
					<Button onClick={onClick}>18</Button>
					<br />
					<br />
				</Scroller>*/}
			</Panel>
		);
	}
}

/*const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}

		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}

		title: PropTypes.string
	},

	render: ({title, onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
			</Header>
			{/*<PatternList index={rest['data-index']} onClick={onClick} />}
			<Scroller>
				<Button onClick={onClick}>1</Button>
				<br />
				<br />
				<Button onClick={onClick}>2</Button>
				<br />
				<br />
				<Button onClick={onClick}>3</Button>
				<br />
				<br />
				<Button onClick={onClick}>4</Button>
				<br />
				<br />
				<Button onClick={onClick}>5</Button>
				<br />
				<br />
				<Button onClick={onClick}>6</Button>
				<br />
				<br />
				<Button onClick={onClick}>7</Button>
				<br />
				<br />
				<Button onClick={onClick}>8</Button>
				<br />
				<br />
				<Button onClick={onClick}>9</Button>
				<br />
				<br />
				<Button onClick={onClick}>10</Button>
				<br />
				<br />
				<Button onClick={onClick}>11</Button>
				<br />
				<br />
				<Button onClick={onClick}>12</Button>
				<br />
				<br />
				<Button onClick={onClick}>13</Button>
				<br />
				<br />
				<Button onClick={onClick}>14</Button>
				<br />
				<br />
				<Button onClick={onClick}>15</Button>
				<br />
				<br />
				<Button onClick={onClick}>16</Button>
				<br />
				<br />
				<Button onClick={onClick}>17</Button>
				<br />
				<br />
				<Button onClick={onClick}>18</Button>
				<br />
				<br />
			</Scroller>
		</Panel>
	)
});*/

export default MainPanel;
