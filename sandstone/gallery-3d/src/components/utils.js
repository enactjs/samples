import * as THREE from 'three';

const get3DShape = (radius, sizeX, sizeY) => {
	const shape = new THREE.Shape();

	let halfX = sizeX * 0.5 - radius;
	let halfY = sizeY * 0.5 - radius;
	let baseAngle = Math.PI * 0.5;

	shape.absarc(halfX, halfY, radius, 0, baseAngle);
	shape.absarc(-halfX, halfY, radius, baseAngle, baseAngle + baseAngle);
	shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle);
	shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle);

	return shape;
};

export {
	get3DShape
};
