import React from 'react';
import hoc from '@enact/core/hoc';
import {Cancelable} from '@enact/ui/Cancelable';

const popPath = (path) => {
	let newPath = '/';
	let lastPath = path;

	if (path) {
		const parts = path.split('/').filter((e) => e);
		lastPath = parts.pop();
		if (parts.length) {
			newPath += parts.join('/');
			if (!newPath) {
				newPath = '/';
			}
		} else {
			// nowhere to go
			newPath += lastPath ? lastPath : '';
		}
	}
	return newPath;
};

const Navigable = hoc({}, (config, Wrapped) => {
	return (class extends React.Component {
		constructor (props) {
			super(props);

			// wrap modified to Cancelable
			Wrapped = Cancelable({onCancel: (p) => this.cancel(p)}, Wrapped);

			this.state = {
				path: props.path
			};
		}

		cancel = (props) => {
			const {onNavigate, path} = props;
			if (onNavigate) {
				onNavigate({path: popPath(path)});
			}
		}

		navigate = ({path}) => {
			this.setState({path});
		}

		render () {
			const props = Object.assign({
				onNavigate: (p) => this.navigate(p)
			}, this.props);
			props.path = this.state.path;
			return (
				<Wrapped {...props} />
			);
		}
	})
});

export default Navigable;
export {Navigable};