import {connect} from 'react-redux';

import {navigate} from '../store';

// @ts-ignore
const mapStateToProps = ({path}) => ({
	path
});

// @ts-ignore
const mapDispatchToProps = (dispatch) => {
	return {
		// @ts-ignore
		onNavigate: ({path}) => dispatch(navigate(path))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
