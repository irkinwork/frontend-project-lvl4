import React from 'react';
import Modal from './CommonModal';
import connect from '../connect';
import { scrollToBottom } from '../lib';

const mapStateToProps = state => ({
  modal: state.modal,
});

@connect(mapStateToProps)
class ModalRemove extends React.Component {
  render() {
    const {
      removeChannel, modal: { props: { name, id } },
    } = this.props;
    return (
      <Modal
        title={`Remove #${name}`}
        okText="Remove"
        doAction={async () => {
          await removeChannel(id, scrollToBottom);
        }}
      >
        {`Do you really want to remove #${name}?`}
      </Modal>
    );
  }
}

export default ModalRemove;
