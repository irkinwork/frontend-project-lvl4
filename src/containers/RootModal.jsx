import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import FormRenameChannel from './FormRenameChannel';
import * as actions from '../actions';

const mapStateToProps = state => ({
  modal: state.modal,
});

const actionCreators = {
  showModal: actions.showModal,
  hideModal: actions.hideModal,
};

@connect(mapStateToProps, actionCreators)
class RootModal extends React.Component {
  render() {
    const { modal: { type, props }, hideModal } = this.props;
    const MODAL_COMPONENTS = {
      Rename: <FormRenameChannel initialValues={{ name: props.value }} id={props.id} />,
      Remove: null,
    };
    const title = `${type} #${props.value}`;
    const SpecificModalContent = MODAL_COMPONENTS[type];
    return (
      <>
        <Modal show={type !== null} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {SpecificModalContent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={hideModal}>
              Close
            </Button>
            <Button variant="secondary" onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RootModal;
