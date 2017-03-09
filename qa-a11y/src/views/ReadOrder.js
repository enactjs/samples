/* eslint-disable react/no-unescaped-entities */

import Button from '@enact/moonstone/Button'
import kind from '@enact/core/kind';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller'

const ReadOrder = kind({
	name: 'ReadOrder',

	render: (props) => (
		<Scroller {...props}>
			<h2>Single Level</h2>

			<h3>With aria-label</h3>
			<div role="region" aria-label="The Panel">
				<p>Focusing the "button" should read "The Panel, Button"</p>
				<Button>Button</Button>
			</div>

			<h3>With aria-labelledby</h3>
			<div role="region" aria-labelledby="header">
				<div id="header">The Panel</div>
				<p>Focusing the "button" should read "The Panel, Button"</p>
				<Button>Button</Button>
			</div>

			<h3>With aria-labelledby + aria-label</h3>
			<div role="region" aria-labelledby="header">
				<div id="header" aria-label="The Panel">Header</div>
				<p>Focusing the "button" should read "The Panel, Button"</p>
				<Button>Button</Button>
			</div>

			<h3>Switching Focus Within Level</h3>
			<div role="region" aria-label="The Panel">
				<p>Focusing the "button" should read "The Panel, Button 1"</p>
				<Button>Button 1</Button>
				<p>Focusing the next "button" should read "Button 2"</p>
				<Button>Button 2</Button>
			</div>

			<h2>Multi Level</h2>

			<h3>With aria-label</h3>
			<div role="region" aria-label="The Panel">
				<p>Focusing the "button" should read "The Panel, Popup, Button"</p>
				<div role="dialog" aria-label="Popup">
					<Button>Button</Button>
				</div>
			</div>

			<h3>With aria-labelledby</h3>
			<div role="region" aria-labelledby="header">
				<div id="header">The Panel</div>
				<p>Focusing the "button" should read "The Panel, Popup, Button"</p>
				<div role="dialog" aria-labelledby="dialogtitle">
					<div id="dialogtitle">Popup</div>
					<Button>Button</Button>
				</div>
			</div>

			<h3>With aria-labelledby + aria-label</h3>
			<div role="region" aria-labelledby="header">
				<div id="header" aria-label="The Panel">Header</div>
				<p>Focusing the "button" should read "The Panel, Popup, Button"</p>
				<div role="dialog" aria-label="Popup">
					<div id="dialogtitle" aria-label="Popup">Dialog Title</div>
					<Button>Button</Button>
				</div>
			</div>

			<h3>Moving down a Level</h3>
			<div role="region" aria-label="The Panel">
				<p>Focusing the "button" should read "The Panel, Button 2"</p>
				<Button>Button 2</Button>
				<p>Focusing the "button" should read "Popup, Button 1"</p>
				<div role="dialog" aria-label="Popup">
					<Button>Button 1</Button>
				</div>
			</div>

			<h3>Moving up a Level</h3>
			<div role="region" aria-label="The Panel">
				<p>Focusing the "button" should read "The Panel, Popup, Button 1"</p>
				<div role="dialog" aria-label="Popup">
					<Button>Button 1</Button>
				</div>
				<p>Focusing the "button" should read "The Panel, Button 2"</p>
				<Button>Button 2</Button>
			</div>
		</Scroller>
	)
});

export default ReadOrder;
export {
	ReadOrder
};