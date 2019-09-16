import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import cookies from 'js-cookie';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Spinner } from 'react-bootstrap';
import FormAddMsg from './FormAddMsg';
import Channels from './Channels';
import Messages from './Messages';
import * as actions from '../actions';
import { UserContext } from '../lib';
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

const actionCreators = {
  setCurrentChannel: actions.setCurrentChannel,
  getChannelsFromGon: actions.getChannelsFromGon,
  getMessagesFromGon: actions.getMessagesFromGon,
  showModal: actions.showModal,
  setIsLoaded: actions.setIsLoaded,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.refMessages = React.createRef();
  }

  async componentDidMount() {
    const {
      getMessagesFromGon, getChannelsFromGon, gon,
      setIsLoaded,
    } = this.props;
    await getChannelsFromGon(gon.channels);
    await getMessagesFromGon(gon.messages);
    await setIsLoaded();
  }

  render() {
    const {
      currentChannelId, messages,
      setCurrentChannel, channels,
      showModal, isLoaded, currentChannel,
    } = this.props;
    const user = cookies.get('user');
    return (
      <UserContext.Provider value={user}>
        {isLoaded ? (
          <Col bsPrefix="col-12 h-100 p-0">
            <RootModal />
            <Row noGutters bsPrefix="row h-100">
              <Col bsPrefix="col-2 bg-info overflow-auto h-100">
                <div className="pt-2 pb-2">
                  <div className="h4 ml-2 text-light mb-0">Slack</div>
                  <div className="btn d-flex align-items-center text-light mb-3">
                    <Fa icon={faUserSecret} />
                    <small className="ml-2">{user}</small>
                  </div>
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
                </div>
                <Channels
                  items={channels.byId}
                  handleModalShow={showModal}
                  currentChannelId={currentChannelId}
                  handleSetCurrentChannel={item => async () => {
                    await setCurrentChannel(item);
                    if (this.refMessages.current.lastElementChild) {
                      await this.refMessages.current.lastElementChild.scrollIntoView(false);
                    }
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
                  refMessages={this.refMessages}
                />
                <FormAddMsg />
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
