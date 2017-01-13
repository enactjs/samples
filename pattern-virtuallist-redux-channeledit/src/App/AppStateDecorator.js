import {connect} from 'react-redux';
import {navigate, getChannelList} from '../actions';

const mapStateToProps = ({path}) => ({
	path
});

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => dispatch(navigate(path)),
		getChannelList: () => dispatch(getChannelList({
			'channelGroup': 'All',
			'channelMode' : ['Tuner'],
			'dataType':0,
			'sort':0
		}))
	};
};

const AppStateDecorator = connect(mapStateToProps, mapDispatchToProps);

export default AppStateDecorator;
export {AppStateDecorator};
