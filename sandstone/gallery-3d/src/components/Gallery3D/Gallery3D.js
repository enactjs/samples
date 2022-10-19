import kind from '@enact/core/kind';
import {OrbitControls} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';

import Image from '../Image';

const positions = [
	[-14, 16, -10], // 0
	[-7, 16, -10], // 1
	[0, 16, -10], // 2
	[7, 16, -10], // 3
	[14, 16, -10], // 4
	[-14, 8, -10], // 5
	[-7, 8, -10], // 6
	[0, 8, -10], // 7
	[7, 8, -10], // 8
	[14, 8, -10], // 9
	[-14, 0, -10], // 10
	[-7, 0, -10], // 11
	[0, 0, -10], // 12
	[7, 0, -10], // 13
	[14, 0, -10], // 14
	[-14, -8, -10], // 15
	[-7, -8, -10], // 16
	[0, -8, -10], // 17
	[7, -8, -10], // 18
	[14, -8, -10], // 19
	[-14, -16, -10], // 20
	[-7, -16, -10], // 21
	[0, -16, -10], // 22
	[7, -16, -10], // 23
	[14, -16, -10]	// 24
];

const Gallery3D = kind({
	name: 'ImageItem3DBase',

	functional: true,

	propTypes: {
		index: PropTypes.number,
		name: PropTypes.string
	},

	render: () => {
		const [isControlled, setIsControlled] = useState(true); // eslint-disable-line react-hooks/rules-of-hooks
		const [pointerDown, setPointerDown] = useState(-1); // eslint-disable-line react-hooks/rules-of-hooks
		const [selected, setSelected] = useState(null); // eslint-disable-line react-hooks/rules-of-hooks
		const fakeRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const galleryRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const imageItemRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks

		const handlePointerMove = useCallback((ev) => { // eslint-disable-line react-hooks/rules-of-hooks
			if (pointerDown !== -1) {
				imageItemRef.current?.handlePointerMove(ev);
			}
		}, [pointerDown]);

		const handlePointerUp = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			if (pointerDown !== -1) {
				setPointerDown(-1);
			}
		}, [pointerDown]);

		return (
			<VRCanvas>
				{isControlled && <OrbitControls />}
				<DefaultXRControllers />
				<ambientLight intensity={0.5} />
				<pointLight intensity={10} position={[10, 30, 10]} />
				<pointLight intensity={2} position={[-20, -30, -10]} />
				<group
					name="imageCopies"
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
					ref={galleryRef}
				>
					{positions.map((position, i) => {
						return (
							<Image
								imageItemRef={pointerDown === i ? imageItemRef : fakeRef}
								index={i}
								key={i}
								name={'Image-' + i}
								pointerDown={pointerDown}
								position={position}
								selected={selected}
								setControlled={setIsControlled}
								setPointerDown={setPointerDown}
								setSelected={setSelected}
							/>
						);
					})}
				</group>
			</VRCanvas>
		);
	}
});

export default Gallery3D;
export {
	Gallery3D
};
