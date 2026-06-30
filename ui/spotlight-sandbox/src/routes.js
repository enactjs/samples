import ContainerSample from './views/ContainerSample';
import DisappearSample from './views/DisappearSample';
import HoldSample from './views/HoldSample';
import SandboxSample from './views/SandboxSample';
import TestPage from './views/TestPage';

export const sampleRoutes = [
	{path: '/ContainerSample', title: 'Container Sample', Component: ContainerSample},
	{path: '/SandboxSample', title: 'Sandbox Sample', Component: SandboxSample},
	{path: '/DisappearSample', title: 'Disappear Sample', Component: DisappearSample},
	{path: '/HoldSample', title: 'Hold Sample', Component: HoldSample},
	{path: '/TestPage', title: 'Test Page', Component: TestPage}
];
