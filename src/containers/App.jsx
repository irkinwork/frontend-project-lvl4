import React from 'react';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import FormAddMsg from './FormAddMsg';
import FormAddChannel from './FormAddChannel';
import Channels from './Channels';
import Messages from './Messages';
import * as actions from '../actions';
import UserCtx from '../context';
import RootModal from './RootModal';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  messages: state.messages,
  channels: state.channels,
});

const actionCreators = {
  setCurrentChannelId: actions.setCurrentChannelId,
  addMessageToStore: actions.addMessageToStore,
  getMessagesRequest: actions.getMessagesRequest,
  getChannelsRequest: actions.getChannelsRequest,
  removeChannelRequest: actions.removeChannelRequest,
  renameChannelRequest: actions.renameChannelRequest,
  showModal: actions.showModal,
  hideModal: actions.hideModal,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  componentDidMount() {
    const { getMessagesRequest, currentChannelId, getChannelsRequest } = this.props;
    getMessagesRequest(currentChannelId);
    getChannelsRequest();
  }

  render() {
    const {
      getMessagesRequest, currentChannelId, messages,
      setCurrentChannelId, channels, removeChannelRequest,
      showModal,
    } = this.props;
    const { confirm } = window;
    return (
      <UserCtx.Provider value={cookies.get('user')}>
        <div className="col-12">
          <RootModal />
          <FormAddChannel />
          <Channels
            items={channels.byId}
            handleModalShow={showModal}
            handleClick={id => () => {
              setCurrentChannelId(id);
              getMessagesRequest(id);
            }}
            handleRemoveChannel={id => () => {
              if (confirm('Do you really want to remove this channel?')) {
                removeChannelRequest(id);
              }
            }}
          />
          <Messages
            currentChannelId={currentChannelId}
            items={messages}
          />
          <FormAddMsg />
        </div>
      </UserCtx.Provider>
    );
  }
}

export default App;
