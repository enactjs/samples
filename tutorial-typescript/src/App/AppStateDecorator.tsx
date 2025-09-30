import {connect} from 'react-redux';

import {navigate, RootState} from '../store';

const mapStateToProps = ({path}: RootState) => ({
	path
});

const mapDispatchToProps = {
	onNavigate: navigate
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AppStateDecorator = connector;

export default AppStateDecorator;
export {AppStateDecorator};
