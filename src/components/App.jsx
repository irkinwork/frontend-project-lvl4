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
}) => {
  const props = {
    messages,
    channels: channels.byId,
    isLoaded,
    currentChannel: channels.byId[currentChannelId],
    currentChannelId,
  };
  return props;
};
const username = cookies.get('user');

@connect(mapStateToProps)
class App extends React.Component {
  static contextType = UserContext;

  async componentDidMount() {
    const {
      getMessagesFromGon, getChannelsFromGon, gon,
      setIsLoaded,
    } = this.props;
    await getChannelsFromGon(gon.channels);
    await getMessagesFromGon(gon.messages);
    await setIsLoaded(true);
  }

  render() {
    const {
      currentChannelId, messages,
      setCurrentChannelId, channels,
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
                <Row bsPrefix="pt-2 pb-2">
                  <Col bsPrefix="col-12 h4 text-light mb-0">Slack</Col>
                  <Col bsPrefix="col-12 btn d-flex align-items-center text-light mb-3">
                    <Fa icon={faUserSecret} />
                    <small className="ml-2">{username}</small>
                  </Col>
                  <button
                    className="btn btn btn-info w-100 text-left"
                    type="button"
                    onClick={() => {
                      showModal({ type: 'Add', props: {} });
                    }}
                  >
                    <Fa icon={faPlusCircle} />
                    <span className="ml-2">Add a new channel</span>
                  </button>
                </Row>
                <Channels
                  items={channels}
                  handleModalShow={showModal}
                  currentChannelId={currentChannelId}
                  handleSetCurrentChannelId={id => async () => {
                    await setCurrentChannelId(id);
                    scrollToBottom();
                  }}
                />
              </Col>
              <Col bsPrefix="col-10 h-100 d-flex flex-column">
                <Header
                  currentChannel={currentChannel}
                  handleRemoveChannel={() => {
                    showModal({ type: 'Remove', props: currentChannel });
                  }}
                  handleRenameChannel={() => {
                    showModal({ type: 'Rename', props: currentChannel });
                  }}
                />
                <Messages
                  currentChannelId={currentChannelId}
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
