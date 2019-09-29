import React from 'react';
import Modal from './CommonModal';
import connect from '../connect';
import { scrollToBottom } from '../lib';

const mapStateToProps = state => ({
  modal: state.modal,
});

@connect(mapStateToProps)
class ModalRemove extends React.Component {
  removeChannel = () => {
    const {
      modal: { props: { id } }, removeChannel,
    } = this.props;
    removeChannel(id, scrollToBottom);
  }

  render() {
    const { modal: { props: { name } } } = this.props;
    return (
      <Modal
        title={`Remove #${name}`}
        okText="Remove"
        doAction={this.removeChannel}
      >
        {`Do you really want to remove #${name}?`}
      </Modal>
    );
  }
}

export default ModalRemove;
