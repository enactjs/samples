/* eslint-disable no-undef */

import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';
import classNames from 'classnames';

import css from './Button.module.less';

/* This is a sample for a new custom element
Reference: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
customElements.define('element-name-here', // a name should be kebab-case and cannot be a single word
	class extends HTMLElement {
		constructor () {
			// For the prototype chain
			super();
			// Set the shadow root
			const shadowRoot = this.attachShadow({mode: 'open'});
		}
		static get observedAttributes () { // if we don't have this getter, attributeChangedCallback will be called for any attribute
			return ['attribute-name-here'];
		}
		connectedCallback () { // when an element is added to DOM tree
			console.log('Custom square element added to page.');
			updateStyle(this);
		}
		disconnectedCallback () { // when an element is removed from DOM tree
			console.log('Custom square element removed from page.');
		}
		adoptedCallback () { // when an element is moved to another DOM tree
			console.log('Custom square element moved to new page.');
		}
		attributeChangedCallback (name, oldValue, newValue) { // when an element's attribute is changed
			console.log('Custom square element attributes changed.');
			updateStyle(this);
		}
	}
);
*/


/* Define Web Component */
customElements.define('poc-button-simple',
	class extends HTMLElement {
		constructor () {
			// For the prototype chain
			super();

			// Set the shadow root
			const shadowRoot = this.attachShadow({mode: 'open'});

			/*
			shadowRoot.applyAuthorStyles = true;
			shadowRoot.resetStyleInheritance = true;
			*/

			shadowRoot.innerHTML = `
				<style>
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
				</style>
				<div class="root">
					<slot name="background" class="background"></slot>
					<div class="content"><slot></slot></div>
				</div>
			`;
		}
	}
);

/* Define Web Component */
customElements.define('poc-button-with-icon',
	class extends HTMLElement {
		constructor () {
			// For the prototype chain
			super();

			// Set the shadow root
			const shadowRoot = this.attachShadow({mode: 'open'});

			/*
			shadowRoot.applyAuthorStyles = true;
			shadowRoot.resetStyleInheritance = true;
			*/

			shadowRoot.innerHTML = `
				<style>
					:host {
						position: relative;
						display: inline-block;
						vertical-align: middle;
						z-index: 0;
					}
					.root {
						height: 100%;
						width: 100%;
					}
					.background::slotted(*:hover) {
						opacity: 0.5;
					}
					.background::slotted(*:focus) {
						opacity: 0.5;
					}
				</style>
				<poc-button-simple class="root">
					<slot name="background" slot="background" class="background"></slot>
					<slot name="icon"></slot>
					<slot></slot>
				</poc-button-simple>
			`;
		}
	}
);

const SimpleButton = (props) => (
	<poc-button-simple {...props} />
);

const ButtonWithIcon = ({children, className, icon, pressed, ...rest}) => (
	<poc-button-with-icon class={classNames(css.button, className, pressed ? 'pressed' : '')} {...rest}>
		<div id="target" slot="background" className={css.background} />
		<span slot="icon">{icon}</span>
		<span>{children}</span>
	</poc-button-with-icon>
);

const SpottableButton = Touchable({activeProp: 'pressed'}, Spottable(ButtonWithIcon));


export default SpottableButton;
export {SimpleButton, SpottableButton};
