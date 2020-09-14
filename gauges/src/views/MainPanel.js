import React from 'react';
// import ri from '@enact/ui/resolution';
import {Panel} from '@enact/agate/Panels';
import Gauge from '@enact/agate/Gauge';
import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import Picker from '@enact/agate/Picker';
import ToggleButton from '@enact/agate/ToggleButton';
// import {IncrementSlider, IncrementSliderTooltip} from '@enact/moonstone/IncrementSlider';
import Slider from '@enact/agate/Slider';
import {Column, Row, Cell} from '@enact/ui/Layout';

import Watch from '../components/Watch';

let updater = null;

const tickOrientations = ['inward', 'outward', 'horizon', 'level'];

const styles = {
	row: {marginLeft: '12px', marginRight: '12px'}
};

const clamp = (val) => Math.min(1, Math.max(0, val));

class Sample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			p: 0.70,
			pm: 0.30,
			counterclockwise: false,
			degrees: 360,
			horizonFlipMajorNumerals: false,
			horizonFlipMinorNumerals: false,
			levelMajorNumerals: false,
			levelMinorNumerals: false,
			majorNumeralsOrientation: 'horizon',
			minorNumeralsOrientation: 'horizon',
			startDegree: 0,
			ticksMajor: 12,
			ticksMinor: 72,
			ticksMajorNumerals: 8,
			ticksMinorNumerals: 24
		};

		// setInterval(this.time, 1000);
	}

	decrement = () => {
		if (this.state.p <= 0) {
			return;
		}
		this.setState((state) => ({
			p: clamp(0, state.p - 0.01)
		}));
	};

	increment = () => {
		if (this.state.p >= 1) {
			clearInterval(updater);
			return;
		}
		this.setState((state) => ({
			p: clamp(state.p + 0.01)
		}));
	};

	sliderSetProgress = ({value}) => this.setState({p: clamp(value / 100)});
	sliderSetProgressMinor = ({value}) => this.setState({pm: clamp(value / 100)});
	time = () => {
		// console.log('seconds:', (new Date().getSeconds() / 60));
		const now = new Date();
		const h = now.getHours();
		this.setState({
			hour: ((h > 12 ? h - 12 : 12) / 12),
			min: (new Date().getMinutes() / 60),
			sec: (new Date().getSeconds() / 60)
		});
	};

	sliderSetDegrees = ({value}) => this.setState({degrees: value});
	sliderSetStartDegree = ({value}) => this.setState({startDegree: value});
	sliderSetTicksMajor = ({value}) => this.setState({ticksMajor: value});
	sliderSetTicksMinor = ({value}) => this.setState({ticksMinor: value});
	sliderSetTicksMajorNumerals = ({value}) => this.setState({ticksMajorNumerals: value});
	sliderSetTicksMinorNumerals = ({value}) => this.setState({ticksMinorNumerals: value});

	toggleCounterclockwise = () => this.setState(({counterclockwise}) => ({counterclockwise: !counterclockwise}));
	// toggleHorizonFlipMajorNumerals = () => this.setState(({horizonFlipMajorNumerals}) => ({horizonFlipMajorNumerals: !horizonFlipMajorNumerals}));
	// toggleHorizonFlipMinorNumerals = () => this.setState(({horizonFlipMinorNumerals}) => ({horizonFlipMinorNumerals: !horizonFlipMinorNumerals}));
	// toggleLevelMajorNumerals = () => this.setState(({levelMajorNumerals}) => ({levelMajorNumerals: !levelMajorNumerals}));
	// toggleLevelMinorNumerals = () => this.setState(({levelMinorNumerals}) => ({levelMinorNumerals: !levelMinorNumerals}));

	pickerSetMajorNumeralsOrientation = ({value}) => this.setState({majorNumeralsOrientation: tickOrientations[value]});
	pickerSetMinorNumeralsOrientation = ({value}) => this.setState({minorNumeralsOrientation: tickOrientations[value]});

	autoUpdate = () => {
		clearInterval(updater);
		this.setState({
			p: 0
		});
		updater = setInterval(this.increment, 100);
	};

	render () {
		return (
			<Panel className="debug layout">
				<Column style={{height: '100%'}}>
					<Cell shrink>
						<Row align="center">
							<Cell shrink>
								<Button size="small" onClick={this.decrement} icon="minus" />
								<Button size="small" onClick={this.increment} icon="plus" />
							</Cell>
							<Cell shrink><Button size="small" onClick={this.autoUpdate}>auto update</Button></Cell>
							<Cell shrink><Picker orientation="horizontal" onChange={this.pickerSetMajorNumeralsOrientation} width="medium">{tickOrientations}</Picker> {/* wrap */}</Cell>
							<Cell shrink><Picker orientation="horizontal" onChange={this.pickerSetMinorNumeralsOrientation} width="medium">{tickOrientations}</Picker> {/* wrap */}</Cell>
							<Cell shrink><ToggleButton size="small" onToggle={this.toggleCounterclockwise} toggleOnLabel="Counterclockwise" toggleOffLabel="Clockwise" /></Cell>
						</Row>
						<Row align="center" style={styles.row}>
							<Cell size={180}>progress:</Cell>
							<Cell>
								<Slider defaultValue={this.state.p * 100} onChange={this.sliderSetProgress} step={0.1} />
							</Cell>
							<Cell size={60}>{Math.round(this.state.p * 100) + '%'}</Cell>
						</Row>
						<Row align="center" style={styles.row}>
							<Cell size={180}>degrees:</Cell>
							<Cell component={Slider} min={15} max={360} step={5} defaultValue={this.state.degrees} onChange={this.sliderSetDegrees} />
							<Cell size={60}>{this.state.degrees + '˚'}</Cell>
						</Row>
						<Row align="center" style={styles.row}>
							<Cell size={180}>startDegree:</Cell>
							<Cell component={Slider} min={0} max={360} step={5} defaultValue={this.state.startDegree} onChange={this.sliderSetStartDegree} />
							<Cell size={60}>{this.state.startDegree + '˚'}</Cell>
						</Row>
						<Row>
							<Cell>
								<Heading>Ticks</Heading>
								<Row align="center">
									<Cell size="4ex" component="label" style={{textAlign: 'end'}}>{this.state.ticksMajor}</Cell>
									<Cell><Slider min={0} max={24} defaultValue={this.state.ticksMajor} onChange={this.sliderSetTicksMajor} /></Cell>
								</Row>
								<Row align="center">
									<Cell size="4ex" component="label" style={{textAlign: 'end'}}>{this.state.ticksMinor}</Cell>
									<Cell><Slider min={0} max={120} defaultValue={this.state.ticksMinor} onChange={this.sliderSetTicksMinor} /></Cell>
								</Row>
							</Cell>
							<Cell>
								<Heading>Numerals</Heading>
								<Row align="center">
									<Cell size="4ex" component="label" style={{textAlign: 'end'}}>{this.state.ticksMajorNumerals}</Cell>
									<Cell><Slider min={0} max={24} defaultValue={this.state.ticksMajorNumerals} onChange={this.sliderSetTicksMajorNumerals} /></Cell>
								</Row>
								<Row align="center">
									<Cell size="4ex" component="label" style={{textAlign: 'end'}}>{this.state.ticksMinorNumerals}</Cell>
									<Cell><Slider min={0} max={60} defaultValue={this.state.ticksMinorNumerals} onChange={this.sliderSetTicksMinorNumerals} /></Cell>
								</Row>
							</Cell>
						</Row>
						<Watch
							hour={this.state.hour}
							minute={this.state.min}
							second={this.state.sec}
						/>
						<Gauge
							hour={this.state.hour}
							minute={this.state.min}
							second={this.state.sec}
							progress={this.state.p}
							progressMinor={this.state.pm}
							counterclockwise={this.state.counterclockwise}
							degrees={this.state.degrees}
							startDegree={this.state.startDegree}
							// horizonFlipMajorNumerals={this.state.horizonFlipMajorNumerals}
							// horizonFlipMinorNumerals={this.state.horizonFlipMinorNumerals}
							// levelMajorNumerals={this.state.levelMajorNumerals}
							// levelMinorNumerals={this.state.levelMinorNumerals}
							majorNumeralsTickOrientation={this.state.majorNumeralsOrientation}
							minorNumeralsTickOrientation={this.state.minorNumeralsOrientation}
							ticksMajor={this.state.ticksMajor}
							ticksMinor={this.state.ticksMinor}
							ticksMajorNumerals={this.state.ticksMajorNumerals}
							ticksMinorNumerals={this.state.ticksMinorNumerals}
						/>
						{/* <ProgressBar progress={this.state.p} style={{marginTop: ri.scaleToRem(99)}} tooltip />
						<ProgressBar progress={this.state.p} style={{marginTop: ri.scaleToRem(99)}}>
							<ProgressBarTooltip side="after" />
						</ProgressBar>
						<ProgressBar progress={this.state.p} orientation="vertical" style={{marginLeft: ri.scaleToRem(150)}}>
							<ProgressBarTooltip side="before" />
						</ProgressBar>
						<ProgressBar progress={this.state.p} orientation="vertical" style={{marginLeft: ri.scaleToRem(99)}}>
							<ProgressBarTooltip side="after" />
						</ProgressBar>
						<br /><br />
							</Cell>
							<Cell>
						<Row style={{height: '100%'}}>
							<Cell>
								<IncrementSlider tooltip />
								<br />
								<IncrementSlider>
									<IncrementSliderTooltip percent side="before" />
								</IncrementSlider>
								<br />
								<IncrementSlider>
									<IncrementSliderTooltip percent side="after" />
								</IncrementSlider>
							</Cell>
							<Cell>
								<Column style={{height: '100%'}}>
									<Cell shrink>
										<Row align="center center">
											<Cell shrink component={IconButton} tooltipText="below right" tooltipPosition="below right">arrowsmalldown</Cell>
											<Cell shrink component={IconButton} tooltipText="below" tooltipPosition="below">arrowsmalldown</Cell>
											<Cell shrink component={IconButton} tooltipText="below center" tooltipPosition="below center">arrowsmalldown</Cell>
											<Cell shrink component={IconButton} tooltipText="below left" tooltipPosition="below left">arrowsmalldown</Cell>
										</Row>
									</Cell>
									<Cell>
										<Row style={{height: '100%', textAlign: 'center'}} align="center center">
											<Cell>
												<IconButton tooltipText="right bottom" tooltipPosition="right bottom">arrowsmallright</IconButton>
												<br />
												<IconButton tooltipText="right middle" tooltipPosition="right middle">arrowsmallright</IconButton>
												<br />
												<IconButton tooltipText="right top" tooltipPosition="right top">arrowsmallright</IconButton>
											</Cell>
											<Cell>
												<IconButton tooltipText="left bottom" tooltipPosition="left bottom">arrowsmallleft</IconButton>
												<br />
												<IconButton tooltipText="left middle" tooltipPosition="left middle">arrowsmallleft</IconButton>
												<br />
												<IconButton tooltipText="left top" tooltipPosition="left top">arrowsmallleft</IconButton>
											</Cell>
										</Row>
									</Cell>
									<Cell shrink>
										<Row align="center center">
											<Cell shrink component={IconButton} tooltipText="above right" tooltipPosition="above right">arrowsmallup</Cell>
											<Cell shrink component={IconButton} tooltipText="above" tooltipPosition="above">arrowsmallup</Cell>
											<Cell shrink component={IconButton} tooltipText="above center" tooltipPosition="above center">arrowsmallup</Cell>
											<Cell shrink component={IconButton} tooltipText="above left" tooltipPosition="above left">arrowsmallup</Cell>
										</Row>
									</Cell>
								</Column>
							</Cell>
						</Row>*/}
					</Cell>
				</Column>
			</Panel>
		);
	}
}

export default Sample;
