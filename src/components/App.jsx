import React from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faSlackHash } from '@fortawesome/free-brands-svg-icons';
import {
  Col, Row, Spinner, Navbar, Nav,
} from 'react-bootstrap';
import FormAddMsg from './FormAddMsg';
import Channels from './Channels';
import Messages from './Messages';
import connect from '../connect';
import { scrollToBottom, handleMsgSubmit } from '../lib';
import RootModal from './RootModal';
import Header from './Header';
import UserContext from '../UserContext';

const mapStateToProps = ({
  currentChannelId, messages, channels, isLoaded,
}) => ({
  channels: Object.values(channels.byId),
  isLoaded,
  currentChannel: channels.byId[currentChannelId],
  currentChannelId,
  messages: messages.filter(item => item.channelId === currentChannelId),
});

@connect(mapStateToProps)
class App extends React.Component {
  static contextType = UserContext;

  handleSetCurrentChannelId = id => () => {
    const { setCurrentChannelId } = this.props;
    setCurrentChannelId(id);
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
    const username = this.context;
    return (
      <>
        {isLoaded ? (
          <>
            <RootModal />
            <Row noGutters className="flex-fill h-100 overflow-hidden">
              <Col lg={2} xl={2} className="bg-dark overflow-auto mh-100">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="flex-lg-column flex-xl-column p-0">
                  <Col bsPrefix="col-12 px-3 my-2 d-flex align-items-center text-light">
                    <Navbar.Brand className="flex-fill text-left">
                      <Fa icon={faSlackHash} className="mr-2" />
                      <span>Irkin Slack</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  </Col>
                  <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                    <Nav className="w-100 flex-column">
                      <Col bsPrefix="col-12 px-3 mb-4 d-flex align-items-center text-light">
                        <Fa icon={faUserSecret} />
                        <small className="ml-2">{username}</small>
                      </Col>
                      <Col bsPrefix="col-12 my-2 px-3">
                        <button
                          className="btn p-0 w-100 text-left text-light align-items-center d-flex justify-content-between"
                          type="button"
                          onClick={this.handleShowAddModal}
                        >
                          Channels
                          <Fa icon={faPlusCircle} />
                        </button>
                      </Col>
                      <Channels
                        items={channels}
                        handleModalShow={showModal}
                        currentChannelId={currentChannelId}
                        handleSetCurrentChannelId={this.handleSetCurrentChannelId}
                      />
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>

              </Col>
              <Col xl={10} lg={10} md={12} className="h-100 d-flex flex-column overflow-auto">
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
          </>
        ) : (
          <Spinner bsPrefix="bg-white align-items-center justify-content-center fixed-top h-100 w-100 d-flex ">
            <div className="spinner-border p-4 text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Spinner>
        )}
      </>
    );
  }
}

export default hot(App);
