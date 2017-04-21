import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

const genders = {
	m: 'Male',
	f: 'Female'
};

const DetailBase = kind({
	name: 'Detail',

	propTypes: {
		color: PropTypes.string,
		gender: PropTypes.string,
		name: PropTypes.string,
		weight: PropTypes.number
	},

	defaultProps: {
		gender: 'm',
		color: 'Tabby',
		weight: 9
	},

	render: ({color, gender, name, weight, ...rest}) => (
		<Panel {...rest}>
			<Header title={name} />
			<div>Gender: {genders[gender]}</div>
			<div>Color: {color}</div>
			<div>Weight: {weight}oz</div>
		</Panel>
	)
});

export default DetailBase;
export {DetailBase as Detail, DetailBase};
