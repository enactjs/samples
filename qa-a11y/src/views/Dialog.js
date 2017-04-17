import Button from '@enact/moonstone/Button';
import Dialog from '@enact/moonstone/Dialog';
import kind from '@enact/core/kind';
import React from 'react';
import Toggleable from '@enact/ui/Toggleable';

const DialogViewBase = kind({
	name: 'DialogView',

	render: ({onClose, onOpen, open}) => (
		<div>
			<Button onClick={onOpen}>Dialog</Button>
			<Dialog onClose={onClose} open={open}>
				<title>You&#39;ve been watching TV for a very long time so let&#39;s do a quick check-in.</title>
				<titleBelow>This TV has been active for 10 hours.</titleBelow>
				<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
				<buttons>
					<Button onClick={onClose}>Go Get A Coffee</Button>
					<Button onClick={onClose}>Keep Watching TV</Button>
				</buttons>
			</Dialog>
		</div>
	)
});

const DialogView = Toggleable(
	{prop: 'open', activate: 'onOpen', deactivate: 'onClose'},
	DialogViewBase
);

export default DialogView;
