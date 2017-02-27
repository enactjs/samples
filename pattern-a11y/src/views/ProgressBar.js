import IconButton from '@enact/moonstone/IconButton';
import ProgressBar from '@enact/moonstone/ProgressBar';
import React from 'react';

class ProgressBarView extends React.Component {
	constructor () {
		super();
		this.state = {
			progressVal: 0.3
		};
	}

	onInc = () => {
		const value = Math.min((this.state.progressVal + 0.1).toFixed(1), 1);
		this.setState({progressVal :value});
	}

	onDec = () =>  {
		const value = Math.max((this.state.progressVal - 0.1).toFixed(1), 0);
		this.setState({progressVal :value});
	}

	initRef = (node) => {
		this.progressRef = node;
	}

	render = () => {
		const {progressVal} = this.state
		//FIXME When aria-valuetext is changed to null, screen reader reads default `0`(zero) by `progressbar` role
		// To prevent this, set to value as one space.
		let a11yText = ' ';
		if (progressVal === 0.5) {
			a11yText = '50% progressing';
		} else if (progressVal === 1) {
			a11yText = 'Completed';
		}

		return (<section>
			<ProgressBar aria-valuetext={a11yText} progress={progressVal}/>
			<br/>
			<IconButton aria-label="Increase" onClick={this.onInc}>plus</IconButton>
			<IconButton aria-label="Decrease" onClick={this.onDec}>minus</IconButton>
		</section>);
	}
}

export default ProgressBarView;
