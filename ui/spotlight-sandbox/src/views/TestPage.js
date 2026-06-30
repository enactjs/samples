import SpottableButton from '../components/SpottableButton';

import css from './TestPage.module.less';

const TestPage = () => (
	<div className={css.testPage}>
		<p className={css.description}>
			Spatial navigation test layout with wide and tall controls. Use arrow keys to verify
			Spotlight chooses the nearest neighbor across differently sized targets.
		</p>
		<div className={css.demoPanel}>
			<div className={css.stage}>
				<div className={css.canvas}>
					<SpottableButton className={css.buttonA} style={{top: '20px', left: '140px', width: '300px'}}>
						A
					</SpottableButton>
					<SpottableButton className={`${css.button} ${css.bigItem}`} style={{top: '100px', left: '40px', width: '1000px', height: '40px'}}>
						B
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '200px', left: '140px', width: '300px'}}>
						C
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '440px', left: '140px', width: '40px', height: '300px'}}>
						D
					</SpottableButton>
					<SpottableButton className={`${css.button} ${css.bigItemVertical}`} style={{top: '340px', left: '240px', width: '40px', height: '1000px'}}>
						E
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '440px', left: '340px', width: '40px', height: '300px'}}>
						F
					</SpottableButton>
				</div>
			</div>
		</div>
	</div>
);

export default TestPage;
