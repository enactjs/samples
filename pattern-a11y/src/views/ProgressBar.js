import IconButton from '@enact/moonstone/IconButton';
import ProgressBar from '@enact/moonstone/ProgressBar';
import React from 'react';

class ProgressBarView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressVal: 30
		};
	}

	onInc = () => {
		this.setState({progressVal : Math.min((this.state.progressVal += 10), 100)});
	}

	onDec = () =>  {
		this.setState({progressVal : Math.max((this.state.progressVal -= 10), 0)});
	}

	initRef = (node) => {
		this.progressRef = node;
	}

	render = () => {
		const
			{progressVal} = this.state,
			value = progressVal/100;
		
		let a11yText = ' ';
		if (progressVal === 50) {
			a11yText = '50% progressing';
		} else if (progressVal === 100) {
			a11yText = 'Completed';
		}


		return (<section>
			<ProgressBar aria-valuetext={a11yText} progress={value}/>
			<br/>
			<IconButton aria-label="Increase" onClick={this.onInc}>plus</IconButton>
			<IconButton aria-label="Decrease" onClick={this.onDec}>minus</IconButton>
		</section>);
	}
}

export default ProgressBarView;
