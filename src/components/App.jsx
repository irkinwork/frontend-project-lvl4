import React from 'react';
import { hot } from 'react-hot-loader/root';
import cookies from 'js-cookie';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import { SubmissionError } from 'redux-form';
import { scroller, Events, scrollSpy } from 'react-scroll';
import FormAddMsg from './FormAddMsg';
import Channels from './Channels';
import Messages from './Messages';
import connect from '../connect';
import { UserContext, makeValuesSafe } from '../lib';
import RootModal from './RootModal';
import Header from './Header';

const mapStateToProps = ({
  currentChannel, messages, channels, isLoaded,
}) => {
  const props = {
    messages,
    channels,
    isLoaded,
    currentChannel,
    currentChannelId: currentChannel.id,
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
    await setIsLoaded();
  }

  scrollToBottom = () => {
    Events.scrollEvent.register('begin');
    Events.scrollEvent.register('end');
    scrollSpy.update();
    scroller.scrollTo('last-message', {
      containerId: 'chat-container',
    });
  }

  handleMsgSubmit = async (values) => {
    const { addMessage, currentChannelId } = this.props;
    const date = format(new Date(), 'dd MMM yyyy hh:mm:ss');
    const safeValues = makeValuesSafe(values);
    const data = {
      attributes: {
        ...safeValues, channelId: currentChannelId, username, date,
      },
    };
    try {
      await addMessage({ data }, this.scrollToBottom);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      currentChannelId, messages,
      setCurrentChannel, channels,
      showModal, isLoaded, currentChannel,
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
                  items={channels.byId}
                  handleModalShow={showModal}
                  currentChannelId={currentChannelId}
                  handleSetCurrentChannel={item => async () => {
                    await setCurrentChannel(item);
                    this.scrollToBottom();
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
                  scrollToBottom={this.scrollToBottom}
                />
                <FormAddMsg initialValues={{ text: '' }} onSubmit={this.handleMsgSubmit} form="msgForm" />
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
