import {connect} from 'react-redux';

import {navigate} from '../store';

const mapStateToProps = ({path}) => ({
	path
});

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
