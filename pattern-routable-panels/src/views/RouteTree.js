import React from 'react'; // eslint-disable-line no-unused-vars

const tree = `    First
    |	\\
Second	Third
	  |
	Fourth

`;

const RouteTree = () => (
	<div>
		<h1>Route Tree</h1>
		<pre>{tree}</pre>
	</div>
);

export default RouteTree;
