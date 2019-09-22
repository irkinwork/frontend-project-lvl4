import { connect } from 'react-redux';
import { submit, change } from 'redux-form';
import * as actions from './actions';

const actionCreators = { ...actions, submit, change };
export default mapStateToProps => Component => connect(mapStateToProps, actionCreators)(Component);
