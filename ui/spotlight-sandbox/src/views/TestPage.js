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
					<SpottableButton className={css.buttonA} style={{top: '30px', left: '195px', width: '420px'}}>
						A
					</SpottableButton>
					<SpottableButton className={`${css.button} ${css.bigItem}`} style={{top: '141px', left: '57px', width: '1401px', height: '57px'}}>
						B
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '279px', left: '195px', width: '420px'}}>
						C
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '615px', left: '195px', width: '57px', height: '420px'}}>
						D
					</SpottableButton>
					<SpottableButton className={`${css.button} ${css.bigItemVertical}`} style={{top: '477px', left: '336px', width: '57px', height: '1401px'}}>
						E
					</SpottableButton>
					<SpottableButton className={css.button} style={{top: '615px', left: '477px', width: '57px', height: '420px'}}>
						F
					</SpottableButton>
				</div>
			</div>
		</div>
	</div>
);

export default TestPage;
