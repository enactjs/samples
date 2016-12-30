import React from 'react';

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
