import { hot } from 'react-hot-loader/root';
import React from 'react';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import Form from './Form';
import Channels from './Channels';
import Messages from './Messages';
import * as actions from '../actions';
import UserCtx from '../context';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  messages: state.messages,
});

const actionCreators = {
  setcurrentChannelId: actions.setcurrentChannelId,
  addMessageToStore: actions.addMessageToStore,
  getMessagesRequest: actions.getMessagesRequest,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  componentDidMount() {
    const { getMessagesRequest, currentChannelId } = this.props;
    getMessagesRequest(currentChannelId);
  }

  render() {
    const {
      getMessagesRequest, currentChannelId, messages, setcurrentChannelId, gon,
    } = this.props;
    return (
      <UserCtx.Provider value={cookies.get('user')}>
        <div className="col-12">
          <Channels
            items={gon.channels}
            handleClick={id => () => {
              setcurrentChannelId(id);
              getMessagesRequest(id);
            }}
          />
          <Messages
            currentChannelId={currentChannelId}
            items={messages}
          />
          <Form />
        </div>
      </UserCtx.Provider>
    );
  }
}

export default hot(App);
