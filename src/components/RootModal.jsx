import React from 'react';
import { connect } from 'react-redux';
import Modal from './CommonModal';
import FormRenameChannel from './FormRenameChannel';
import * as actions from '../actions';

const mapStateToProps = state => ({
  modal: state.modal,
});

const actionCreators = {
  showModal: actions.showModal,
  hideModal: actions.hideModal,
  removeChannelRequest: actions.removeChannelRequest,
};

@connect(mapStateToProps, actionCreators)
class RootModal extends React.Component {
  constructor(props) {
    super(props);
    this.refSubmit = React.createRef();
  }

  render() {
    const { modal: { type, props }, hideModal, removeChannelRequest } = this.props;
    const renameModal = (
      <Modal
        isShow={type === 'Rename'}
        hideModal={hideModal}
        title={`Rename #${props.value}`}
        okText="Rename"
        doAction={() => {
          this.refSubmit.current.click();
        }}
      >
        <FormRenameChannel
          refSubmit={this.refSubmit}
          initialValues={{ name: props.value }}
          id={props.id}
        />
      </Modal>
    );
    const removeModal = (
      <Modal
        isShow={type === 'Remove'}
        hideModal={hideModal}
        title={`Do you really want to remove #${props.value}?`}
        okText="Remove"
        doAction={() => {
          removeChannelRequest(props.id);
          hideModal();
        }}
      />
    );
    const MODAL_COMPONENTS = {
      Rename: renameModal,
      Remove: removeModal,
    };
    const SpecificModal = MODAL_COMPONENTS[type];
    return (
      <>{SpecificModal}</>
    );
  }
}

export default RootModal;
