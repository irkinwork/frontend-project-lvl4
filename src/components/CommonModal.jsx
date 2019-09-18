import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../actions';

const actionCreators = {
  hideModal: actions.hideModal,
};

@connect(null, actionCreators)
class CommonModal extends React.PureComponent {
  render() {
    const {
      children, isShow, hideModal, doAction, title = '',
      okText = 'OK',
    } = this.props;
    const onExit = (e) => {
      if (e) e.persist();
      hideModal();
    };
    const onOk = () => {
      if (doAction) doAction();
    };
    return (
      <Modal show={isShow} onHide={onExit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onOk}>
            {okText}
          </Button>
          <Button variant="secondary" onClick={onExit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CommonModal;
