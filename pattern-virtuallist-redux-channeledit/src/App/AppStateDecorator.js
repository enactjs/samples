import {connect} from 'react-redux';
import {navigate, getChannelList} from '../actions';

const mapStateToProps = ({path}) => ({
	path
});

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		getChannelList: () => dispatch(getChannelList())
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
