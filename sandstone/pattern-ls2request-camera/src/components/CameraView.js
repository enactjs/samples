import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import {Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {closeCamera, getCameraIds, startCamera} from '../store';

const CameraView = () => {
	const videoRef = useRef(null);
	const dispatch = useDispatch();
	const cameraIds = useSelector((store) => store.deviceList);
	const cameraStatus = useSelector((store) => store.status);

	let cameraOption;

	useEffect(() => {
		if (typeof window !== 'undefined' && typeof window.PalmSystem !== 'undefined') {
			dispatch(getCameraIds({}));
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
		}
	}, [cameraStatus]);

	const checkSystem = () => {
		if (typeof window === 'undefined' || typeof window.PalmSystem === 'undefined') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}
	};

	if (typeof window !== 'undefined' && typeof window.PalmSystem === 'undefined') {
		return <div>This test will only function correctly on webOS systems!</div>;
	}

	cameraOption = encodeURIComponent(JSON.stringify({
		mediaTransportType: 'CAMERA',
		option: cameraStatus
	}));

	return (
		<div>
			{checkSystem()}
			<Heading showLine>Camera List</Heading>
			<VirtualList
				dataSize={cameraIds.length}
				// eslint-disable-next-line react/jsx-no-bind
				itemRenderer={({index}) => (
					<Item
						// eslint-disable-next-line react/jsx-no-bind
						onClick={() => {
							dispatch(startCamera(cameraIds[index].id));
						}}
					>
						{cameraIds[index].id}
					</Item>
				)}
				itemSize={ri.scale(144)}
			/>
			<Column>
				<video ref={videoRef} height="480" width="720">
					<source src="camera://com.webos.service.camera2/" type={'service/webos-camera;cameraOption=' + cameraOption} />
				</video>
			</Column>
			<Column align="center">
				<Button
					size="small"
					// eslint-disable-next-line react/jsx-no-bind
					onClick={() => {
						dispatch(closeCamera(cameraStatus.handle));
					}}
				>
					Close Camera
				</Button>
			</Column>
		</div>
	);
};

export default CameraView;
