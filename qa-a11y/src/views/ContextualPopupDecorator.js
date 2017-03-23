import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import Group from '@enact/ui/Group';
import RadioItem from '@enact/moonstone/RadioItem';
import React from 'react';
import Selectable from '@enact/ui/Selectable';

const
	ContextualButton = ContextualPopupDecorator(Button),
	SelectableGroup = Selectable(Group);

class ContextualPopupDecoratorView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open1: false,
			open2: false,
			open3: false
		}

		this.handleClick1 = this.handleClick(1);
		this.handleClick2 = this.handleClick(2);
		this.handleClick3 = this.handleClick(3);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
	}

	handleClick = (expNum) => () => {
		this.setState({
			['open' + expNum]: !this.state['open' + expNum]
		});
	}

	handleClose = (expNum) => () => {
		this.setState({
			['open' + expNum]: false
		});
	}

	renderPopup1 = () => (
		<div>
			<span>Item 1</span>
			<br />
			<span>Item 2</span>
			<br />
			<span>Item 3</span>
			<br />
		</div>
	)

	renderPopup2 = () => (
		<div>
			<Button>Button</Button>
			<Button>Button2</Button>
			<Button>Button3</Button>
		</div>
	)

	renderPopup3 = () => (
		<SelectableGroup
			childComponent={RadioItem}
			itemProps={{inline: false}}
			select='radio'
			selectedProp='selected'
			defaultSelected={0}
		>
			{['Creek', 'River', 'Ocean']}
		</SelectableGroup>
	)

	render () {
		const {open1, open2, open3} = this.state;

		return (
			<div>
				<div style={{position: 'absolute', left: '0'}}>
					<ContextualButton
						direction='right'
						onClick={this.handleClick1}
						onClose={this.handleClose1}
						open={open1}
						popupComponent={this.renderPopup1}
					>
						Average
					</ContextualButton>
				</div>
				<div style={{position: 'absolute', bottom: '0'}}>
					<ContextualButton
						direction='up'
						onClick={this.handleClick2}
						onClose={this.handleClose2}
						open={open2}
						popupComponent={this.renderPopup2}
						showCloseButton
						spotlightRestrict='self-only'
					>
						Spotlight Modal
					</ContextualButton>
				</div>

				<div style={{position: 'absolute', right: '0'}}>
					<ContextualButton
						direction='left'
						onClick={this.handleClick3}
						onClose={this.handleClose3}
						open={open3}
						popupComponent={this.renderPopup3}
					>
						Nested Radio
					</ContextualButton>
				</div>
			</div>
		);
	}
}

export default ContextualPopupDecoratorView;