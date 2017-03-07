import {connect} from 'react-redux';
import {navigate} from '../actions';
import FileBrowser from '../components/FileBrowser';

const mapStateToProps = (state) => {
	console.log('FILEBROWSERCONTAINER STATE', state);
	return {
		path: state.path
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onNavigate: ({path}) => {
			dispatch(navigate(path));
		}
	};
};

const FileBrowserContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(FileBrowser);

export default FileBrowserContainer;
