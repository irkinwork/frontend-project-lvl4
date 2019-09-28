import React from 'react';
import { hot } from 'react-hot-loader/root';
import cookies from 'js-cookie';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Spinner } from 'react-bootstrap';
import FormAddMsg from './FormAddMsg';
import Channels from './Channels';
import Messages from './Messages';
import connect from '../connect';
import { UserContext, scrollToBottom, handleMsgSubmit } from '../lib';
import RootModal from './RootModal';
import Header from './Header';

const mapStateToProps = ({
  currentChannelId, messages, channels, isLoaded,
}) => ({
  channels: Object.values(channels.byId),
  isLoaded,
  currentChannel: channels.byId[currentChannelId],
  currentChannelId,
  messages: messages.filter(item => item.channelId === currentChannelId),
});

const username = cookies.get('user');

@connect(mapStateToProps)
class App extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    const { getDataFromGon, gon } = this.props;
    const { messages, channels } = gon;
    getDataFromGon({ messages, channels });
  }

  handleSetCurrentChannelId = id => async () => {
    const { setCurrentChannelId } = this.props;
    await setCurrentChannelId(id);
    scrollToBottom();
  }

  handleShowAddModal = () => {
    const { showModal } = this.props;
    showModal({ type: 'Add', props: {} });
  }

  handleRemoveChannel = () => {
    const { showModal, currentChannel } = this.props;
    showModal({ type: 'Remove', props: currentChannel });
  }

  handleRenameChannel = () => {
    const { showModal, currentChannel } = this.props;
    showModal({ type: 'Rename', props: currentChannel });
  }

  render() {
    const {
      currentChannelId, messages,
      channels,
      showModal, isLoaded, currentChannel,
      addMessage,
    } = this.props;
    return (
      <UserContext.Provider value={username}>
        {isLoaded ? (
          <Col bsPrefix="col-12 h-100 p-0">
            <RootModal />
            <Row noGutters bsPrefix="row h-100">
              <Col bsPrefix="col-2 bg-info overflow-auto h-100">
                <Row bsPrefix="py-2">
                  <Col bsPrefix="col-12 h4 text-light mb-0">Slack</Col>
                  <Col bsPrefix="col-12 btn d-flex align-items-center text-light mb-3">
                    <Fa icon={faUserSecret} />
                    <small className="ml-2">{username}</small>
                  </Col>
                  <button
                    className="btn btn btn-info w-100 text-left"
                    type="button"
                    onClick={this.handleShowAddModal}
                  >
                    <Fa icon={faPlusCircle} />
                    <span className="ml-2">Add a new channel</span>
                  </button>
                </Row>
                <Channels
                  items={channels}
                  handleModalShow={showModal}
                  currentChannelId={currentChannelId}
                  handleSetCurrentChannelId={this.handleSetCurrentChannelId}
                />
              </Col>
              <Col bsPrefix="col-10 h-100 d-flex flex-column">
                <Header
                  currentChannel={currentChannel}
                  handleRemoveChannel={this.handleRemoveChannel}
                  handleRenameChannel={this.handleRenameChannel}
                />
                <Messages
                  items={messages}
                />
                <FormAddMsg initialValues={{ text: '' }} onSubmit={handleMsgSubmit(addMessage, currentChannelId, username)} form="msgForm" />
              </Col>
            </Row>
          </Col>
        ) : (
          <Spinner bsPrefix="bg-white align-items-center justify-content-center fixed-top h-100 w-100 d-flex ">
            <div className="spinner-border p-4 text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Spinner>
        )}
      </UserContext.Provider>
    );
  }
}

export default hot(App);
