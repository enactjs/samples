/* eslint-disable no-undef */

import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';
import classNames from 'classnames';
import {LitElement, html, css} from 'lit';

import componentCss from './Button.module.less';


class PocButtonSimple extends LitElement {
	static styles = [css`
		:host {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			text-align: center;
			z-index: 0;
		}
		.root {
			height: 100%;
			width: 100%;
		}
		.background::slotted(*) {
			position: absolute;
			display: inline-block;
			height: 100%;
			width: 100%;
			inset: 0;
			z-index: -1;
		}
		.content {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
	`];
	render () {
		return html`
			<div class="root">
				<slot name="background" class="background"></slot>
				<div class="content"><slot></slot></div>
			</div>
		`;
	}
}
customElements.define('poc-button-simple', PocButtonSimple);

class PocButtonWithIcon extends LitElement {
	static styles = [css`
		:host {
			position: relative;
			display: inline-block;
			vertical-align: middle;
			z-index: 0;
		}
		:host .background {} /* not working */
		.root {
			height: 100%;
			width: 100%;
		}
		.background::slotted(*:hover) {} /* not working */
		.background::slotted(*:focus) {} /* not working */
	`];
	render () {
		return html`
			<poc-button-simple class="root">
				<slot name="background" slot="background" class="background"></slot>
				<slot name="icon"></slot>
				<slot></slot>
			</poc-button-simple>
		`;
	}
};
customElements.define('poc-button-with-icon', PocButtonWithIcon);

const ButtonSimple = (props) => (
	<poc-button-simple {...props} />
);

const ButtonWithIcon = ({children, className, icon, pressed, ...rest}) => (
	<poc-button-with-icon class={classNames(componentCss.button, className, pressed ? 'pressed' : '')} {...rest}>
		<div id="target" slot="background" className={componentCss.background} />
		<span slot="icon" className={componentCss.icon}>{icon}</span>
		{children}
	</poc-button-with-icon>
);

const SpottableButtonSimple = Touchable({activeProp: 'pressed'}, Spottable(ButtonSimple));

const SpottableButtonWithIcon = Touchable({activeProp: 'pressed'}, Spottable(ButtonWithIcon));


export default SpottableButtonWithIcon;
export {
	ButtonSimple,
	ButtonWithIcon,
	SpottableButtonSimple,
	SpottableButtonWithIcon
};
