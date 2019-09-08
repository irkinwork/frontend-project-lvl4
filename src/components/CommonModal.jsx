import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CommonModal = ({
  children, isShow, hideModal, doAction, title = '',
  okText = 'OK',
}) => (
  <Modal show={isShow} onHide={hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    {children && (
      <Modal.Body>{children}</Modal.Body>
    )}

    <Modal.Footer>
      <Button variant="primary" onClick={doAction}>
        {okText}
      </Button>
      <Button variant="secondary" onClick={hideModal}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CommonModal;
