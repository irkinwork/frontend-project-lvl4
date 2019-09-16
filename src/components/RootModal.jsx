import React from 'react';
import { connect } from 'react-redux';
import Modal from './CommonModal';
import CommonChannelForm from './CommonChannelForm';
import * as actions from '../actions';

const mapStateToProps = state => ({
  modal: state.modal,
});

const actionCreators = {
  showModal: actions.showModal,
  removeChannelRequest: actions.removeChannelRequest,
  renameChannelRequest: actions.renameChannelRequest,
  addChannelRequest: actions.addChannelRequest,
};

@connect(mapStateToProps, actionCreators)
class RootModal extends React.Component {
  constructor(props) {
    super(props);
    this.refSubmit = React.createRef();
  }

  render() {
    const {
      modal: { type, props }, removeChannelRequest,
      renameChannelRequest, addChannelRequest,
    } = this.props;
    const renameModal = (
      <Modal
        isShow={type === 'Rename'}
        title={`Rename #${props.name}`}
        okText="Rename and close"
        doAction={() => {
          this.refSubmit.current.click();
        }}
      >
        <CommonChannelForm
          refSubmit={this.refSubmit}
          initialValues={{ name: props.name }}
          id={props.id}
          form="renameChannelForm"
          doAction={renameChannelRequest}
          okText="Rename"
        />
      </Modal>
    );
    const removeModal = (
      <Modal
        isShow={type === 'Remove'}
        title={`Remove #${props.name}`}
        okText="Remove"
        doAction={() => {
          removeChannelRequest(props.id);
        }}
      >
        {`Do you really want to remove #${props.name}?`}
      </Modal>
    );
    const addModal = (
      <Modal
        isShow={type === 'Add'}
        title="Add a new channel"
        okText="Add and close"
        doAction={() => {
          this.refSubmit.current.click();
        }}
      >
        <CommonChannelForm
          refSubmit={this.refSubmit}
          id={props.id}
          form="addChannelForm"
          doAction={addChannelRequest}
          okText="Add"
        />

      </Modal>
    );
    const modalComponents = {
      Rename: renameModal,
      Remove: removeModal,
      Add: addModal,
    };
    const SpecificModal = modalComponents[type];
    return (
      <>{SpecificModal}</>
    );
  }
}

export default RootModal;
